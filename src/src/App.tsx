import React, { useEffect } from "react";
import { BrowserRouter, Link, Redirect, Route, RouteProps, Switch } from "react-router-dom";
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
    exact: true,
    component: DashboardPage,
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    exact: true,
    component: HomePage,
    path: "/",
    name: "Home",
  },
];

export const notAuthRoute: Array<CustomRoute> = [
  {
    exact: true,
    component: LoginPage,
    path: "/login",
    name: "Login",
  },
  {
    exact: true,
    component: RegisterPage,
    path: "/register",
    name: "Register",
  },
];

function App() {
  const { isLoggedIn: auth, setLogin } = useAuth();

  useEffect(() => {
    setLogin();
  }, [setLogin]);

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
            <Switch>
              {authRoute.map((route) => {
                return <Route {...route} />;
              })}
              <Redirect to="/" />
            </Switch>
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
            <Switch>
              {notAuthRoute.map((route) => {
                return <Route {...route} />;
              })}
              <Redirect to="/login" />
            </Switch>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
