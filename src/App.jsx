import "./App.scss";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { firebase } from "./config/firebase";
import { Header, UploadMultipleImages } from "./components";
import Authenticate from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({ uid: currentUser.uid, email: currentUser.email });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .catch((err) => {
        console.error("Error in signOut", err.message);
      });
  }

  return (
    <Router>
      <div className="App">
        <Header hasUser={!!user} onLogout={() => handleLogout()} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Switch>
            <Route path="/">
              {user ? <UploadMultipleImages userId={user.uid} /> : <Authenticate onLogin={setUser} />}
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
