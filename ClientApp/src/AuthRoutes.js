import { Login } from "./components/Login"
import { Signup } from "./components/Signup"

const AuthRoutes = [
    {
        index: true,
        element: <Login />
    },

    {
        path: '/signup',
        requireAuth: true,
        element: <Signup />
    },
];

export default AuthRoutes;

