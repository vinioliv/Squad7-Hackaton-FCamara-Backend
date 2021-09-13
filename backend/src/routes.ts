import { Router } from "express";

import { UserRegistration, UserLogin} from "./controllers/UserController";
import { ScheduleAvailable } from "./controllers/ScheduleController";


const router = Router();

const userRegistration = new UserRegistration();
const userLogin = new UserLogin();

const scheduleAvailable = new ScheduleAvailable();


router.post("/register", userRegistration.handle);
router.get("/login", userLogin.handle);
router.get("/consultavailability", scheduleAvailable.handle)

export {router};