import { firebase } from "../config/firebase";
import { useState } from "react";
import "./Login.scss";

const Authenticate = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = values.email;
    const password = values.password;

    if (!isLogin) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((currentUser) => {
          const { email, uid } = currentUser.user;
          onLogin({ email, uid });
        })
        .catch((error) => {
          console.error("Error in createUserWithEmailAndPassword", error.message);
          setError(error.message);
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((currentUser) => {
          const { email, uid } = currentUser.user;
          onLogin({ email, uid });
        })
        .catch((error) => {
          console.error("Error in createUserWithEmailAndPassword", error.message);
          setError(error.message);
        });
    }
  };

  return (
    <div className="container-xl mt-5" style={{ height: "94vh" }}>
      <div className="row my-auto">
        <div className="col-10 col-md-6 mx-auto ">
          <div className="card p-3">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <label className="form-label">Email: </label>
                <input className="form-control" type="text" required={true} name="email" onChange={handleChange} />
              </fieldset>
              <fieldset>
                <label className="form-label">Password: </label>
                <input
                  className="form-control mb-2"
                  type="password"
                  required={true}
                  name="password"
                  onChange={handleChange}
                />
              </fieldset>
              {error ? <p color="red">{error}</p> : null}
              <button type="submit" className="form-login__btn btn my-1 w-100">
              {isLogin ? "Iniciar sesión" : "Registrarme"}
              </button>
              <button className="form-login__btn2 btn  w-100" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Quiero registrarme" : "Quiero iniciar sesión"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
