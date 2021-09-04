import "./App.scss";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { firebase } from "./config/firebase";
import { UploadSimpleImg, Header } from "./components";
import GalleryCreate from "./pages/GalleryCreate";
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
        <Header hasUser={!!user} onLogout={() => handleLogout()}/>
        <Switch>
          <Route path="/">{user ? <GalleryCreate userId={user.uid} /> : <Authenticate onLogin={setUser} />}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
