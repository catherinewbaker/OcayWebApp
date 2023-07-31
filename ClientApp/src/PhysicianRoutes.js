import { Survey } from "./components/Survey";
import { PhysicianResults } from "./components/PhysicianResults";
import { HomePhysician } from "./components/HomePhysician";
import { Question } from "./components/Question"
import { PhysicianProfile } from "./components/PhysicianProfile"

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
];

export default PhysicianRoutes;
