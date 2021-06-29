import React from "react";
import { useAuth } from "../state/auth.state";

const HomePage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      <button
        onClick={() => {
          logout();
        }}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
