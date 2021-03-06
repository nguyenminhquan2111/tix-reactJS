import DashboardMovie from "containers/AdminTemplate/DashboardMoviePage/DashboardMovie";
import Dashboard from "containers/AdminTemplate/DashboardUserPage/Dashboard";
import DetailPage from "../containers/HomeTemplate/DetailPage";
import HomePage from "../containers/HomeTemplate/HomePage";
import DashboardTheaterManager from "../containers/AdminTemplate/DashboardTheaterManagerPage/DashboardTheaterManager";
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
  {
    exact: false,
    path: "/admin/dashboard-theater-manager",
    component: DashboardTheaterManager,
  },
];
export { routesHome, routesAdmin };
