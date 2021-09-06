import {Request, Response} from "express";
import { UserService } from "../services/UserService";

class UserRegistration{
    async handle(request: Request, response: Response){
        const {email, password, name, workingArea, contact, picture, admin} = request.body;
        
        const userService = new UserService();
        const user = await userService.save({email, password, name, workingArea, contact, picture, admin});

        return response.json(user);
    }
}

export {UserRegistration}