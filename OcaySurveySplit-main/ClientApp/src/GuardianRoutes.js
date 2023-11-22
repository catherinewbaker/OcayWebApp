import { Survey } from "./components/Survey";
import { GuardianResults } from "./components/GuardianResults";
import { HomeGuardian } from "./components/HomeGuardian";
import { Question } from "./components/Question";
import { GuardianProfile } from "./components/GuardianProfile";
import { GuardianCards } from "./components/GuardianCards";
import { ChangePassword } from "./components/ChangePassword"

const GuardianRoutes = [
    {
        index: true,
        element: <HomeGuardian />
    },

    {
        path: '/GuardianResults',
        requireAuth: true,
        element: <GuardianResults />
    },

    {
        path: '/GuardianProfile',
        requireAuth: true,
        element: <GuardianProfile />
    },
    {
        path: '/GuardianCards',
        requireAuth: true,
        element: <GuardianCards />
    },

    {
        path: '/change-password',
        requireAuth: true,
        element: <ChangePassword />
    },
];

export default GuardianRoutes;
