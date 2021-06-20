import Form from "component/HomeTemplate/Form/Form";
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
  {
    exact: false,
    path: "/login",
    component: Form,
  },
];

export { routesHome };
