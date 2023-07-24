import { Survey } from "./components/Survey";
import { Results } from "./components/Results";
import { HomePatient } from "./components/HomePatient";
import { PhysicianResults } from "./components/PhysicianResults";
import { Home } from "./components/Home";
>>>>>>> origin/cath:ClientApp/src/AppRoutes.js
import { Question } from "./components/Question"
import { Signup } from "./components/Signup"
import { PatientResults } from "./components/PatientResults";

const PatientRoutes = [
    {
        index: true,
        element: <HomePatient />
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

export default PatientRoutes;
