import { Field } from "formik";

const CheckBoxes = () => {
  return (
    <div role="group" aria-labelledby="checkbox-group">
      <p className="p-0 m-0 mt-2">8. Selecciona las tecnologías usadas en el proyecto: </p>
      <div className="form-check">
        <label className="form-check-label py-3">
          <Field className="form-check-input mx-2" type="checkbox" name="stack" value="rhinoceros" />
          Rhinoceros
        </label>
        <label className="form-check-label py-3">
          <Field className="form-check-input mx-2" type="checkbox" name="stack" value="photoshop" />
          Photoshop
        </label>
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
  );
};

export default CheckBoxes;
