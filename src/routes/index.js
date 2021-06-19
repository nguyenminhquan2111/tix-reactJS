import Dashboard from "containers/AdminTemplate/DashboardPage/Dashboard";
import DetailPage from "../containers/HomeTemplate/DetailPage";
import HomePage from "../containers/HomeTemplate/HomePage";
import TicketPage from "../containers/HomeTemplate/TicketPage";

const routesHome = [
  {
    exact: true,
    path: "/",
    component: HomePage,
  },
  {
    exact: false,
    path: "/detail/:id",
    component: DetailPage,
  },

  {
    exact: false,
    path: "/ticket",
    component: TicketPage,
  },
];
const routesAdmin = [
  {
    exact: false,
    path: "/dashboard",
    component: Dashboard,
  },
];
export { routesHome, routesAdmin };
