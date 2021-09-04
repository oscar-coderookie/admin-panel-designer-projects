import { firebase } from "../config/firebase";
import { useState } from "react";

const Authenticate = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [values, setValues]= useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  console.log(values)

  const handleSubmit = (e)=> {
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
  }

  
  return (
    <div className="container-xl my-4" style={{height: "100vh"}}>
      <div className="row ">
        <div className="col-10 col-md-6 mx-auto my-auto">
          <div className="card p-3">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <label className="form-label">Email: </label>
                <input className="form-control" type="text" required={true} name="email" onChange={handleChange} />
              </fieldset>
              <fieldset>
                <label className="form-label">Password: </label>
                <input className="form-control mb-2" type="password" required={true} name="password" onChange={handleChange}/>
              </fieldset>
              {error ? <p color="red">{error}</p> : null}
              <button type="submit" className="btn btn-secondary my-1 w-100">
                {isLogin ? "Iniciar sesión" : "Registrarme"}
              </button>
              <button onClick={() => setIsLogin(!isLogin)} className="btn btn-primary my-1 w-100">
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
