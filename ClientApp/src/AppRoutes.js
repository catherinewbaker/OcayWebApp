import { Survey } from "./components/Survey";
import { Results } from "./components/Results";
import { Home } from "./components/Home";
import { Question } from "./components/Question"

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
        path: '/results',
        requireAuth: true,
        element: <Results />
    },
];

export default AppRoutes;
