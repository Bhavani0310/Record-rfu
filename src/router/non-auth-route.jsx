import { lazy } from "react";

const Signup = lazy(() => import("../pages/SignupPage"));

const routes = [{ name: "Register", path: "/", element: <Signup /> },
];

export default routes;
