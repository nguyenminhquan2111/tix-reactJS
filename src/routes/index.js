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

export { routesHome };
