import { auth } from "./firebase";
import React, { useRef, useState } from "react";
import { firestore, storage } from "./firebase";

const UserProfile = () => {
  const [state, setState] = useState({
    displayName: "",
  });
  // TODO: put a loader in updating a profile
  const imageInput = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ [name]: value });
  };

  const file = () => {
    return imageInput.current && imageInput.current.files[0];
  };

  const uid = () => {
    return auth.currentUser.uid;
  };

  const userRef = () => {
    return firestore.doc(`users/${uid()}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { displayName } = state;
    if (displayName) {
      userRef().update({
        displayName,
      });
    }

    if (file()) {
      storage
        .ref()
        .child("user-profiles")
        .child(uid())
        .child(file().name)
        .put(file())
        .then((response) => response.ref.getDownloadURL())
        .then((photoURL) => userRef().update({ photoURL }));
    }

    console.log(file().name);
  };

  const { displayName } = state;
  return (
    <section className="UserProfile">
      <form onSubmit={handleSubmit} className="UpdateUser">
        <input
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          placeholder="Enter display name."
        />
        <input
          type="file"
          // To access the file name, i have written like this.
          ref={(ref) => (imageInput.current = ref)}
          name="image-upload"
        />
        <input className="update" type="submit" />
      </form>
    </section>
  );
};

export default UserProfile;
