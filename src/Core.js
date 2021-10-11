import React, { useState } from "react";
import Navbar from "./components/Navbar";

import "../src/styles/Core.css";

function Core() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [role, setRole] = useState("");

  return (
    <div className="core-container">
      <Navbar
        userName={userName}
        setUserName={setUserName}
        password={password}
        setPassword={setPassword}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        role={role}
        setRole={setRole}
      />
    </div>
  );
}

export default Core;
