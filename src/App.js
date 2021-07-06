import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./containers/PageNotFound";
import { routesAdmin, routesHome } from "./routes";
import HomeTemplate from "./containers/HomeTemplate";
import AdminTemplate from "containers/AdminTemplate";
import Form from "component/HomeTemplate/Form/Form";
import Auth from "containers/AdminTemplate/AuthPage/Auth";
import TicketPage from "containers/HomeTemplate/TicketPage";
function App() {
  const renderRoutesHome = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <HomeTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  };
  const renderRoutesAdmin = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <AdminTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  };
  return (
    <BrowserRouter>
      <Switch>
        {renderRoutesHome(routesHome)}
        {renderRoutesAdmin(routesAdmin)}
        <Route path="/ticket/:maLichChieu" component={TicketPage} />
        <Route path="/auth" component={Auth} />
        <Route path="/login" component={Form} />
        <Route path="" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
