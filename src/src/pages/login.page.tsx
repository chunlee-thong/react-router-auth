import React from "react";
import { useAuth } from "../state/auth.state";

const LoginPage = () => {
  const { login } = useAuth();
  return (
    <div>
      <h1>Login Page</h1>
      <button
        onClick={() => {
          login("mytoken");
        }}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
