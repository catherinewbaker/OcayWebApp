import { Survey } from "./components/Survey";
import { Results } from "./components/Results";
import { HomePatient } from "./components/HomePatient";
import { Question } from "./components/Question"
import { Signup } from "./components/Signup"

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
        path: '/results',
        requireAuth: true,
        element: <Results />
    },
];

export default PatientRoutes;
