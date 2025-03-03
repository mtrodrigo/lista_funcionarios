import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Details } from "./pages/details";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Layout } from "./components/layout";
import { Private } from "./routes/private";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/details/:id',
        element: <Details />
      },
      {
        path: '/register',
        element: <Private><Register /></Private>
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])
export { router }