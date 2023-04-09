import { BrowserRouter, Switch } from "react-router-dom";
import routes from './routes.json';
import Login from "../components/Login/Login";
import Charts from "../components/Charts/Charts";
import Registration from "../components/Registration/Registration";
import Files from "../components/Files/Files";
import Home from "../pages/Home/Home";

function PrivateRoute(props) {
  return null;
}

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path={routes.HOME_PAGE} exact component={Home} />
        <PrivateRoute path={routes.LOGIN_PAGE || ""} exact component={Login} />
        <PrivateRoute path={routes.CHARTS_PAGE} component={Charts} />
        <PrivateRoute path={routes.FILES_PAGE} exact component={Files} />
        <PrivateRoute path={routes.REGISTRATION_PAGE} exact component={Registration} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainRoutes;