import React, { useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, RouteProps, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard.page";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import { useAuth } from "./state/auth.state";

export interface CustomRoute extends RouteProps {
  name: string;
}

export const authRoute: Array<CustomRoute> = [
  {
    element: <DashboardPage/>,
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    element: <HomePage/>,
    path: "/",
    name: "Home",
  },
];

export const notAuthRoute: Array<CustomRoute> = [
  {

    element: <LoginPage/>,
    path: "/login",
    name: "Login",
  },
  {
    element:<RegisterPage/>,
    path: "/register",
    name: "Register",
  },
];

function App() {
  const { isLoggedIn: auth, setLogin } = useAuth();

  useEffect(() => {
    setLogin();
  }, [setLogin]);

  console.log(auth);

  return (
    <div>
      <BrowserRouter>
        {auth ? (
          <div>
            <ul>
              {authRoute.map((route) => (
                <li>
                  <Link to={`${route.path}`}>{route.name}</Link>
                </li>
              ))}
            </ul>
            <Routes>
              {authRoute.map((route) => {
                return <Route {...route} />;
              })}
              
              <Route path="*" element={<Navigate replace to={'/'}/>}></Route>
            </Routes>
          </div>
        ) : (
          <div>
            <ul>
              {notAuthRoute.map((route) => (
                <li>
                  <Link to={`${route.path}`}>{route.name}</Link>
                </li>
              ))}
            </ul>
            <Routes>
              {notAuthRoute.map((route) => {
                return <Route {...route} />;
              })}
              <Route path="*" element={<Navigate replace to={'/login'}/>}></Route>
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
