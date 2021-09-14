import { Router } from "express";

import { UserRegistration, UserLogin} from "./controllers/UserController";
import { ScheduleAvailable, SaveSchedule, DeleteSchedule } from "./controllers/ScheduleController";


const router = Router();

const userRegistration = new UserRegistration();
const userLogin = new UserLogin();

const scheduleAvailable = new ScheduleAvailable();
const saveSchedule = new SaveSchedule();
const deleteSchedule = new DeleteSchedule();

router.post("/register", userRegistration.handle);
router.get("/login", userLogin.handle);

router.post("/consultavailability", scheduleAvailable.handle);
router.post("/saveschedule", saveSchedule.handle);

router.delete("/deleteschedule", deleteSchedule.handle);

export {router};