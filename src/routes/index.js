import DashboardMovie from "containers/AdminTemplate/DashboardMoviePage/DashboardMovie";
import Dashboard from "containers/AdminTemplate/DashboardUserPage/Dashboard";
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
    path: "/admin/dashboard-user",
    component: Dashboard,
  },
  {
    exact: false,
    path: "/admin/dashboard-movie",
    component: DashboardMovie,
  },
];
export { routesHome, routesAdmin };
