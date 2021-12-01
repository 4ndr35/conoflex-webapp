import React, { useState } from "react";
import NavbarComponent from "./components/Enrutador.js";

function Core() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <div>
      <NavbarComponent
        userName={userName}
        setUserName={setUserName}
        password={password}
        setPassword={setPassword}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
      />
    </div>
  );
}

export default Core;
