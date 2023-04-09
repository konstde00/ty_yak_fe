import "./App.css";
import { Routes, Route } from "react-router-dom";
import routes from "../../routes/routes.json";
import Login from "../Login/Login";
import Charts from "../Charts/Charts";
import Files from "../Files/Files";
import Registration from "../Registration/Registration";
import NoMatch from "../NavBar/NoMatch";
import useToken from "./useToken";
import React from "react";
import GenerateConfirmationCode from "../RestorePassword/GenerateConfirmationCode";
import ConfirmCode from "../RestorePassword/ConfirmCode";
import PasswordChange from "../RestorePassword/PasswordChange";
import Home from "../Home/Home";

const App = () => {

  // const navigate = useNavigate();

  const { token, setToken } = useToken();
  //
  // if (!token) {
  //
  //   navigate("/login")
  // }

  return (
    <>
      <Routes>
        <Route path={routes.HOME_PAGE} element={<Home/>} />
        <Route path={routes.LOGIN_PAGE} exact element={<Login setToken={setToken}/>} />
        <Route path={routes.CHARTS_PAGE} exact element={<Charts/>} />
        <Route path={routes.FILES_PAGE} exact element={<Files/>} />
        <Route path={routes.REGISTRATION_PAGE} exact element={<Registration setToken={setToken}/>} />
        <Route path={routes.GENERATE_CONFIRMATION_CODE} exact element={<GenerateConfirmationCode/>} />
        <Route path={routes.CONFIRM_CODE} exact element={<ConfirmCode/>} />
        <Route path={routes.CHANGE_PASSWORD} exact element={<PasswordChange/>} />
        <Route path="*" exact element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;