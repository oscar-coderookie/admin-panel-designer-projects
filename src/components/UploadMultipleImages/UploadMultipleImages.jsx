import React, { useState } from "react";
import { storage, db, timestamp } from "../../config/firebase";
import { Formik, Field, Form } from "formik";
import CheckBoxes from "./CheckBoxes";
import "./UploadMultipleImages.scss";

const ReactFirebaseFileUpload = () => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [enterprise, setEnterprise] = useState("");
  const [progress, setProgress] = useState(0);
  const [profileImg, setProfileImg] = useState("");

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleTitle = (e) => {
    const titleSplit = e.target.value.replace(/ /g, "-");
    setTitle(titleSplit);
  };

  const handleOptions = (e) => {
    setProfileImg(e.currentTarget.value);
  };

  const handleAlbumName = (e) => {
    const albumName = e.target.value.replace(/ /g, "-");
    setEnterprise(albumName);
  };

  const resetForm = () => {
    window.location.reload();
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const promises = [];
    const nameProject = title;
    const nameAlbum = enterprise;

    if (images === null) {
      alert("Porfavor Selecciona las imágenes a subir");
    } else if (nameAlbum === "") {
      alert("Porfavor selecciona la empresa");
    } else if (nameProject === "") {
      alert("Porfavor inserta el nombre del álbum de fotos");
    } else {
      // eslint-disable-next-line
      images.map((image) => {
        const uploadTask = storage.ref(`images//${nameAlbum}/${nameProject}/${image.name}`).put(image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await storage
              .ref(`images/${nameAlbum}/${nameProject}`)
              .child(image.name)
              .getDownloadURL()
              .then((urlimg) => {
                setUrls((prevState) => [...prevState, urlimg]);
              });
          }
        );
      });

      Promise.all(promises)
        .then(() => alert("Imágenes subidas a Cloud storage"))
        .catch((err) => console.log(err));
    }
  };

  const uploadProject = async (values) => {
    try {
      const images = urls;
      const dbRef = db.collection("projects");
      const createdAt = timestamp();
      const thumb = profileImg;
      await dbRef.add({ ...values, images, thumb, createdAt });
      alert("Proyecto añadido exitosamente a la base de datos¡¡");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create container-xl">
      <div className="row">
        <div className="col-10 col-md-8 mx-auto d-flex flex-column">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleUpload}>
                <div className="mb-3">
                  <p className="">1. Primero que todo vamos a seleccionar las imágenes del proyecto:</p>
                  <input
                    className="form-control"
                    type="file"
                    multiple
                    onChange={handleChange}
                    accept="image/png, image/gif, image/jpeg"
                    required={true}
                  />
                  <div className="form-text">Imágenes (selecciona min. 4 imágenes / máx. 10, sólo JPG/PNG):</div>
                </div>
                <div className="mb-3">
                  <p>2. Seleccionamos la empresa a la cual desarollamos dicho proyecto:</p>
                  <select onChange={handleAlbumName} className="form-select" required={true}>
                    <option value="la web del colchon">La Web del colchón</option>
                    <option value="dormidán">Dormidán</option>
                    <option value="stars management">Stars Management</option>
                    <option value="muebles mayorga">Muebles Mayorga</option>
                  </select>
                </div>
                <div className="mb-3">
                  <p>3. Asignamos un título al álbum en el cual queremos almacenarlas:</p>
                  <input
                    type="text"
                    className="form-control my-2 create__input"
                    name="title-album"
                    required={true}
                    onChange={handleTitle}
                  />
                </div>
                <div className="mb-3">
                  <p>4. Subimos las imágenes al servicio Cloud:</p>
                  <button className="create__btn btn btn-secondary w-100 ">
                    Subir imágenes
                  </button>
                  <progress className="create__progress w-100 mt-3 " value={progress} max="100" />
                  {progress === 100 ? (
                    <div className="form-text" style={{ color: "red" }}>
                      Imágenes subidas con éxito.
                    </div>
                  ) : null}
                </div>
              </form>
              <Formik
                initialValues={{}}
                onSubmit={async (values) => {
                  await uploadProject(values);
                }}
              >
                {({ values }) => (
                  <Form>
                    <p>5. Selecciona una opción de la lista para elegirla como imagen de perfil:</p>
                    <div className="mb-3">
                      <div>
                        <select component="select" onChange={handleOptions} className="form-select ">
                          {urls.map((url) => {
                            return (
                              <option key={url} value={url}>
                                {url}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        {profileImg === "" ? (
                          <img
                            src="https://yiyanhe.com/styles/imgs/placeholder_600x400.svg"
                            alt="thumbnail"
                            className="create__profile-img"
                          />
                        ) : (
                          <img className="create__profile-img" src={profileImg} alt="profileImg" />
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <p>6. Ahora le asignamos un título al proyecto de diseño:</p>
                      <Field className="form-control create__input" type="text" name="title" />
                    </div>
                    <div className="mb-3">
                      <p>7. Describe brevemente el proyecto y de qué trata:</p>
                      <Field as="textarea" name="description create__input" className="form-control" type="text" />
                    </div>
                    <CheckBoxes />
                    <p>9. Guarda el proyecto en la base de datos: </p>
                    <div className="mb-3 d-flex">
                      <button className="create__btn2 btn btn-secondary w-100 me-1" type="submit">
                        Guardar Proyecto
                      </button>
                      <button className="btn btn-warning w-100 ms-1" onClick={resetForm} type="reset">
                        Limpiar Formulario
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactFirebaseFileUpload;
