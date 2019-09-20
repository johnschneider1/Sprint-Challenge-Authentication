import React, { useState } from "react";
import axios from "axios";

const initialinfo = {
  username: "",
  password: ""
};

const Login = props => {
  const [info, setinfo] = useState(initialinfo);

  const handleChange = e =>
    setinfo({ ...info, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3300/api/auth/login", info)
      .then(res => {
        console.log(res);
        setinfo(initialinfo);
        localStorage.setItem("token", res.data.token);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
        name="username"
        value={info.username}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={info.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
