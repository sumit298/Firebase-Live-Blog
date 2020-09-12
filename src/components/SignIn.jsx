import React, { useState } from "react";

function SignIn() {
  const [signInState, setSignInState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInState({ ...signInState, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSignInState({
      email: "",
      password: "",
    });
  };
  const { email, password } = signInState;
  return (
    <form onSubmit={handleSubmit} className="SignIn">
      <h2>Sign In</h2>
      <input
        type="text"
        name="email"
        value={email}
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="email"
        value={password}
        placeholder="Email"
        onChange={handleChange}
      />
      <input type="submit" value="Sign In" />
      <button>Sign In with Google</button>
    </form>
  );
}

export default SignIn;
