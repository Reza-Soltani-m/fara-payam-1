import { createBrowserRouter } from "react-router-dom";
// import Home from "../pages/Home";
// import About from "../pages/About";
// import Layout from "../layouts/Layout";
import { WareHouseBill } from "../pages";

const router = createBrowserRouter([
  {
    // element: <Layout />,
    children: [{ path: "/", element: <WareHouseBill /> }],
  },
]);

export default router;
