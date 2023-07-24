import { Survey } from "./components/Survey";
import { Results } from "./components/Results";
import { HomePhysician } from "./components/HomePhysician";
import { Question } from "./components/Question"

const PhysicianRoutes = [
    {
        index: true,
        element: <HomePhysician />
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

export default PhysicianRoutes;
