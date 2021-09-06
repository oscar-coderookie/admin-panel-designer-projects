import React, { useState } from "react";
import { storage, db, timestamp } from "../../config/firebase";
import { Formik, Field, Form } from "formik";
import CheckBoxes from "./CheckBoxes";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ReactFirebaseFileUpload = () => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);

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

  const handleUpload = () => {
    const promises = [];
    const nameAlbum = title;
    // eslint-disable-next-line
    images.map((image) => {
      const uploadTask = storage.ref(`images/${nameAlbum}/${image.name}`).put(image);
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
            .ref(`images/${nameAlbum}`)
            .child(image.name)
            .getDownloadURL()
            .then((urlimg) => {
              setUrls((prevState) => [...prevState, urlimg]);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };

  console.log(images);
  console.log(urls);

  const uploadProject = async (values) => {
    const images = urls;
    const dbRef = db.collection("projects");
    const createdAt = timestamp();
    const thumb = urls[0];
    await dbRef.add({ ...values, images, thumb, createdAt });
    alert("Proyecto añadido exitosamente a la base de datos¡¡");
  };

  return (
    <div>
      <div className="container-xl">
        <div className="row">
          <div className="col-10 col-md-8 mx-auto d-flex flex-column">
              <progress className="w-100 my-3" value={progress} max="100" />
            <div class="mb-3">
              <label className="form-label">Imágenes (selecciona min. 4 imágenes):</label>
              <input className="form-control" type="file" multiple onChange={handleChange} />
            </div>
            <div class="mb-3">
              <label className="form-label">Título album:</label>
              <input
                type="text"
                className="form-control my-2"
                name="title-album"
                placeholder="inserta un nombre unico de album.."
                onChange={handleTitle}
              />
            </div>
            <div class="mb-3">
              <button className="btn btn-secondary w-100 " onClick={handleUpload}>
                Subir imágenes
              </button>
            </div>

            <div>
              <Formik
                initialValues={{
                }}
                onSubmit={async (values, onSubmitProps) => {
                  await sleep(500);
                  uploadProject(values);
                  onSubmitProps.setSubmitting(false);
                  onSubmitProps.resetForm();
                }}
              >
                {({ values }) => (
                  <Form>
                    <div class="mb-3">
                      <label className="form-label">Imagen de perfil:</label>
                      <Field className="form-control" type="text" name="thumb" value={urls[0]} />
                    </div>
                    <div class="mb-3">
                      <label className="form-label">Título del proyecto:</label>
                      <Field className="form-control" type="text" name="title" />
                    </div>
                    <div class="mb-3">
                      <label className="form-label">Descripción:</label>
                      <Field as="textarea" name="description" className="form-control" type="text" />
                    </div>
                    <CheckBoxes/>
                    <button className="btn btn-secondary w-100" type="submit">
                      Guardar Proyecto
                    </button>
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
