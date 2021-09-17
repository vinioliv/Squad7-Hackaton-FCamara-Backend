import { Router } from "express";

import { UserRegistration, UserLogin} from "./controllers/UserController";
import { ScheduleAvailable, SaveSchedule, DeleteSchedule, ScheduleHistory } from "./controllers/ScheduleController";

import swaggerUi from "swagger-ui-express";


const router = Router();

const userRegistration = new UserRegistration();
const userLogin = new UserLogin();

const scheduleAvailable = new ScheduleAvailable();
const saveSchedule = new SaveSchedule();
const deleteSchedule = new DeleteSchedule();
const scheduleHistory = new ScheduleHistory();





router.post("/register", userRegistration.handle);

router.post("/login", userLogin.handle);

router.post("/consultavailability", scheduleAvailable.handle);
router.post("/saveschedule", saveSchedule.handle);

router.get('/schedulehistory', scheduleHistory.handle);

router.post("/deleteschedule", deleteSchedule.handle);

export {router};