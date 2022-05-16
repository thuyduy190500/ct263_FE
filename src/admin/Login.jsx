import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Login.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { avigate } from "react-router-dom";

// const xuly(){
//   // lay dl tu 2 the input
//   // goi api login(kemf 2 dl)
// }
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData(username, password) {
      // console.log(username, password);
      const isLogin = await axios.post("http://localhost:8000/login", {
        username: username,
        password: password,
      });
      // console.log(isLogin.data);
      if (isLogin.data) {
        console.log(isLogin.data);
        navigate("/home");
      }
    }
    // setFullName({name:'TrungHC',familyName: 'HCT'});
    fetchData(username, password);
  }, [username, password]);
  const handleOnClick = () => {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    // alert(usernameInput + passwordInput);
    setUsername(usernameInput);
    setPassword(passwordInput);
  };

  return (
    <div>
      <body className="login">
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="user-box">
              <input type="text" id="username" required="" />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input type="password" id="password" required="" />
              <label>Password</label>
            </div>
            <button id="submit" onClick={handleOnClick}>
              <a href="#">
                {/* <span></span>
                  <span></span>
                  <span></span>
                  <span></span> */}
                Submit
              </a>
            </button>
          </form>
        </div>
      </body>
    </div>
  );
}
