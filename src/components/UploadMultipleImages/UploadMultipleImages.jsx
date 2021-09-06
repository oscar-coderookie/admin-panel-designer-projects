import React, { useState } from "react";
import { storage, db, timestamp } from "../../config/firebase";


const ReactFirebaseFileUpload = () => {
  const INITIAL_STATE = {
    images: [],
    title: "",
    createdAt: ""

  }
  const [images, setImages] = useState([]);
  const [values, setValues] = useState(INITIAL_STATE);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleUpload = () => {
    const arrayUrls = [];
    const promises = [];
    images.map((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(async(urls) => {
             await arrayUrls.push(urls);
              
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));

    const dbRef = db.collection("images");
    const createdAt = timestamp();
    dbRef.add({ title: values.title, images: arrayUrls , createdAt });
  };

  return (
    <div>
      <div className="container-xl">
        <div className="row">
          <div className="col-10 col-md-8 mx-auto d-flex flex-column">
            <progress className="w-100" value={progress} max="100" />
            <input type="text" name="title" onChange={handleInput} />
            <input className="form-control" type="file" multiple onChange={handleChange} />
            <button className="btn btn-secondary " onClick={handleUpload}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactFirebaseFileUpload;
