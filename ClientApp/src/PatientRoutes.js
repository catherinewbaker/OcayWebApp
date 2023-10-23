import { Survey } from "./components/Survey";
import { HomePatient } from "./components/HomePatient";
import { PhysicianResults } from "./components/PhysicianResults";
import { Question } from "./components/Question"
import { Signup } from "./components/Signup"
import { PatientResults } from "./components/PatientResults";
import { PatientProfile } from "./components/PatientProfile"
import { ChangePassword } from "./components/ChangePassword"

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
        path: '/PatientResults',
        requireAuth: true,
        element: <PatientResults />
    },

    {
        path: '/PatientProfile',
        requireAuth: true,
        element: <PatientProfile />
    },

    {
        path: '/change-password',
        requireAuth: true,
        element: <ChangePassword />
    },



];

export default PatientRoutes;

