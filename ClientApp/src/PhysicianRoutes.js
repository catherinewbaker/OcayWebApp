import { Survey } from "./components/Survey";
import { PhysicianResults } from "./components/PhysicianResults";
import { HomePhysician } from "./components/HomePhysician";
import { Question } from "./components/Question";
import { PhysicianProfile } from "./components/PhysicianProfile";
import { PhysicianCards } from "./components/PhysicianCards";
import { ChangePassword } from "./components/ChangePassword"

const PhysicianRoutes = [
    {
        index: true,
        element: <HomePhysician />
    },

    {
        path: '/PhysicianResults',
        requireAuth: true,
        element: <PhysicianResults />
    },

    {
        path: '/PhysicianProfile',
        requireAuth: true,
        element: <PhysicianProfile />
    },
    {
        path: '/PhysicianCards',
        requireAuth: true,
        element: <PhysicianCards />
    },

    {
        path: '/change-password',
        requireAuth: true,
        element: <ChangePassword />
    },
];

export default PhysicianRoutes;
