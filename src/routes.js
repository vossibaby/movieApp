import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";

export const router = createBrowserRouter([
    { index: true, Component: Home },
       { path: "/:id", Component: MovieDetail },

]);
