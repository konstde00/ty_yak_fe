import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "../../routes/routes.json";
import useToken from "./useToken";
import Main from "../Main/Main";
import Following from "../Following/Following";
import Settings from "../Settings/Settings";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Charts from "../Charts/Charts";
import Files from "../Files/Files";
import GenerateConfirmationCode from "../RestorePassword/GenerateConfirmationCode";
import ConfirmCode from "../RestorePassword/ConfirmCode";
import PasswordChange from "../RestorePassword/PasswordChange";
import NoMatch from "../NoMatch/NoMatch";

const App = () => {
  const { setToken } = useToken();

  return (
    <div className="ty-app">
      <Routes>
        <Route path={routes.HOME_PAGE} element={<Main/>} />
        <Route path={routes.FOLLOWING_PAGE} element={<Following/>} />
        <Route path={routes.SETTINGS_PAGE} element={<Settings/>} />
        <Route path="/check-in" element={<Navigate to={routes.HOME_PAGE} replace />} />
        <Route path="/circle" element={<Navigate to={routes.FOLLOWING_PAGE} replace />} />
        <Route path={routes.LOGIN_PAGE} element={<Login setToken={setToken}/>} />
        <Route path={routes.REGISTRATION_PAGE} element={<Registration setToken={setToken}/>} />
        <Route path={routes.CHARTS_PAGE} element={<Charts/>} />
        <Route path={routes.FILES_PAGE} element={<Files/>} />
        <Route path={routes.GENERATE_CONFIRMATION_CODE} element={<GenerateConfirmationCode/>} />
        <Route path={routes.CONFIRM_CODE} element={<ConfirmCode/>} />
        <Route path={routes.CHANGE_PASSWORD} element={<PasswordChange/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default App;
