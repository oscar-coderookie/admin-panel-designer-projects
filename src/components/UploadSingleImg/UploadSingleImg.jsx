import { useState, useEffect } from "react";
import { timestamp, db, storage } from "../../config/firebase";
import  ProjectCard  from "./../ProjectCard/ProjectCard"


const UploadSimpleImg = () => {
  const INITIAL_STATE = {
    title: "",
    description: "",
    stack1: "",
    stack2: "",
    stack3: "",
    stack4: ""
  };

  const [file, setFile] = useState(null);
  const [values, setValues] = useState(INITIAL_STATE);
  const [designProjects, setDesignProjects] = useState([]);


  const getAllDesignProjects = async () => {
    try {
      await db.collection("projects").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setDesignProjects(docs)
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDesignProjects()
  }, []);

  console.log(designProjects)

  const handleImage = (event) => {
    event.preventDefault();
    const selected = event.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  
  };
  

  const uploadImage = async () => {
    const storageRef = storage.ref();
    const createdAt = timestamp();
    const dbRef = db.collection("projects");

    const fileRef = storageRef.child(`images/html/${values.title}`);
    const fileName = file.name;
    const spaceRef = fileRef.child(fileName);
    await spaceRef.put(file);
    const thumb = await spaceRef.getDownloadURL();
    
    await dbRef.add({ ...values, thumb, createdAt});
    alert("imagen añadida exitosamente a la base de datos¡¡");
  };

  return (
    <div
      style={{
        display: "flex",
        paddingTop: 60,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="container-xl">
        <div className="row">
          <div className="col-10 col-lg-6 mx-auto">
            <div className="card my-3">
            <div className="card-header">
              <h2>Formulario creación de proyectos</h2>
            </div>
              <div className="card-body">
                <p>Imagen de perfil (sólo jpg/png):</p>
                <input 
                className="form-control my-2" 
                type="file"
                onChange={handleImage} 
               
                name="images"
                accept="image/png, image/gif, image/jpeg"
                required />
                <p>Título del proyecto:</p>
                <input
                  className="form-control my-2"
                  type="text"
                  placeholder="Bautiza tu proyecto.."
                  onChange={handleInput}
                  name="title"
                />
                <p>Software utilizado (selecciona el stack utilizado):</p>
                <div className="options d-flex flex-nowrap flex-lg-wrap my-2">
                  <label className="form-control text-center w-25 d-flex flex-column align-items-center" htmlFor="logo1">
                    <input
                      className="p-3 mx-2"
                      type="checkbox"
                      
                      name="stack1"
                      id="logo"
                      value="photoshop"
                      onChange={handleInput}
               
                    />
                    Photoshop
                  </label>
                  <label className="form-control text-center w-25 d-flex flex-column align-items-center" htmlFor="logo2">
                    <input
                      className="p-3 mx-2 "
                      type="checkbox"
                      
                      name="stack2"
                      id="logo"
                      value="rhinoceros"
                      onChange={handleInput}
                    />
                    Rhinoceros
                  </label>
                  <label className="form-control text-center w-25 d-flex flex-column align-items-center" htmlFor="logo3">
                    <input
                      className="p-3 mx-2 text-left"
                      type="checkbox"
                      name="stack3"
                      id="logo"
                      value="3d-max"
                      onChange={handleInput}
                    />
                    3d-max
                  </label>
                  <label className="form-control text-center w-25 d-flex flex-column align-items-center" htmlFor="logo3">
                    <input
                      className="p-3 mx-2 text-left"
                      type="checkbox"
                      
                      name="stack4"
                      id="logo"
                      value="vray"
                      onChange={handleInput}
                    />
                    Vray
                  </label>
                </div>
                <p>Descripción del proyecto:</p>
                <textarea
                  className="form-control my-2"
                  type="text"
                  placeholder="Escribe una breve reseña..."
                  onChange={handleInput}
                  rows="4"
                  name="description"
                />
                <button className="btn btn-secondary w-100 my-2" onClick={uploadImage}>
                  Guardar Proyecto
                </button>
                <button className="btn btn-danger w-100 my-2">
                  Limpiar Formulario
                </button>
              </div>
            </div>
          </div>
          <div className="col-10 col-lg-4 mx-auto">
          <h3>Listado:</h3>
           {designProjects.map((project) => {
             return (
              <ProjectCard
              key={project.id}
              srcImg={project.thumb}
              title={project.title}
              description={project.description}
              stack1={project.stack1}
              stack2={project.stack2}
              stack3={project.stack3}
              stack4={project.stack4}
              />
             )
           })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSimpleImg;
