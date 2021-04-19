import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavbarHome from "./component/NavbarHome/Navbar";
import PageNotFound from "./containers/PageNotFound";
import { routesHome } from "./routes";

function App() {
  const renderRoutesHome = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <Route
            key={index}
            exact={item.exact}
            path={item.path}
            component={item.component}
          />
        );
      });
    }
  };
  return (
    <BrowserRouter>
      <NavbarHome />
      <Switch>
        {renderRoutesHome(routesHome)}

        <Route path="" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
