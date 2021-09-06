import { useState } from "react";
import { Formik, Field, Form } from "formik";
import { timestamp, db, storage } from "../../config/firebase";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const BasicForm = () => {
  const [file, setFile] = useState(null);

  const handleImage = (event) => {
    event.preventDefault();
    const selected = event.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const uploadProject = async (values) => {
    const storageRef = storage.ref();
    const createdAt = timestamp();
    const dbRef = db.collection("projects");

    const fileRef = storageRef.child(`images/html/${file.name}`);
    const fileName = file.name;
    const spaceRef = fileRef.child(fileName);
    await spaceRef.put(file);
    const thumb = await spaceRef.getDownloadURL();

    await dbRef.add({ ...values, thumb, createdAt });
    alert("Proyecto añadido exitosamente a la base de datos¡¡");
  };

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
          stack: [],
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
              <label className="form-label">Título del proyecto:</label>
              <Field className="form-control" type="text" name="title" />
            </div>
            <div class="mb-3">
              <label className="form-label">Descripción:</label>
              <Field as="textarea" name="description" className="form-control" type="text" />
            </div>
            <div class="mb-3">
              <label className="form-label">Imagen de perfil:</label>
              <input onChange={handleImage} className="form-control" type="file" name="thumb" />
            </div>
            <div role="group" aria-labelledby="checkbox-group">
              <p className="p-0 m-0 mt-2">Selecciona las tecnologías usadas en el proyecto: </p>
              <div className="form-check">
                <label className="form-check-label py-3">
                  <Field className="form-check-input mx-2" type="checkbox" name="stack" value="rhinoceros" />
                  Rhinoceros
                </label>
                <label className="form-check-label py-3">
                  <Field className="form-check-input mx-2" type="checkbox" name="stack" value="photoshop" />
                  Photoshop
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label py-3">
                  <Field className="form-check-input mx-2" type="checkbox" name="stack" value="3d-max" />
                  3D-Max
                </label>

                <label className="form-check-label py-3">
                  <Field className="form-check-input mx-2" type="checkbox" name="stack" value="vray" />
                  V-Ray
                </label>
              </div>
            </div>

            <button className="btn btn-secondary w-100" type="submit">
              Guardar Proyecto
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BasicForm;
