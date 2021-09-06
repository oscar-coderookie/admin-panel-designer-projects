import { useState, useEffect } from "react";
import {db} from "../../config/firebase";
import ProjectCard from "./../ProjectCard/ProjectCard";

import BasicFormik from "./Formik";

const UploadSimpleImg = () => {
  const [designProjects, setDesignProjects] = useState([]);

  const getAllDesignProjects = async () => {
    try {
      await db.collection("projects").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setDesignProjects(docs);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDesignProjects();
  }, []);

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
                <BasicFormik />
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
                  stack={project.stack}
                />
              );
            })}
          </div>
          <div className="col-10 col-lg-4 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default UploadSimpleImg;
