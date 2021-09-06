import { useState, useRef, useEffect} from "react";

const Checks = () => {
  const [checked, setChecked] = useState([]);
  const [formData, setFormData] = useState("");
  const [arrayChecks, setArrayChecks] = useState([
    {
      id: 1,
      name: "photoshop",
    },
    {
      id: 2,
      name: "rhinoceros",
    },
    {
      id: 3,
      name: "3d-max",
    },
    {
      id: 4,
      name: "vray",
    },
  ]);

  const checks = useRef(null);

  useEffect(() => {
    setFormData(new FormData());
  }, []);

  const handleToggle = c => () => {
    // return the first index or -1
    const clickedCategory = arrayChecks.indexOf(c);
    const all = [{arrayChecks}];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setChecked(all);
  };
  console.log(checked)


  return (
    <div className="d-flex">
      {arrayChecks.map(({ id, name }, index) => {
        return (
          <fieldset className="form-control w-25" key={index}>
            <input
              className="p-3 mx-2 text-left"
              type="checkbox"
              ref={checks}
              name={name}
              value={name}
              onChange={handleToggle(id)}
            />
            <label className=" text-center  d-flex flex-column align-items-center" htmlFor={`custom-checkbox-${index}`}>
              {name}
            </label>
            <p></p>
          </fieldset>
        );
      })}
    </div>
  );
};

export default Checks;
