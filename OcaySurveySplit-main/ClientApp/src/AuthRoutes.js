import { Login } from "./components/Login"
import { Signup } from "./components/Signup"
import { ChangePassword } from "./components/ChangePassword"

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

    {
        path: '/change-password',
        requireAuth: true,
        element: <ChangePassword />
    },
];

export default AuthRoutes;

