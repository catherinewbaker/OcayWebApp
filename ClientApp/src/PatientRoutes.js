import { Survey } from "./components/Survey";
import { PhysicianResults } from "./components/PhysicianResults";
import { Home } from "./components/Home";
import { Question } from "./components/Question"
import { Signup } from "./components/Signup"
import { PatientResults } from "./components/PatientResults";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },

    {
        path: '/survey',
        requireAuth: true,
        element: <Survey />
    },

    {
        path: '/survey/questions',
        requireAuth: true,
        element: <Question />
    },

    {
        path: '/PhysicianResults',
        requireAuth: true,
        element: <PhysicianResults />
    },

    {
        path: '/PatientResults',
        requireAuth: true,
        element: <PatientResults />
    },
];

export default AppRoutes;
