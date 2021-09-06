import { Router } from "express";

import { UserRegistration } from "./controllers/UserController";


const router = Router();

const userRegistration = new UserRegistration();

router.post("/register", userRegistration.handle);

export {router};