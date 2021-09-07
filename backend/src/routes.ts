import { Router } from "express";

import { UserRegistration, UserLogin} from "./controllers/UserController";


const router = Router();

const userRegistration = new UserRegistration();
const userLogin = new UserLogin();


router.post("/register", userRegistration.handle);
router.get("/login", userLogin.handle)

export {router};