import {Request, Response} from "express";
import { UserService } from "../services/UserService";

class UserRegistration{
    async handle(request: Request, response: Response){
        const {email, password, name, workingArea, contact, picture, admin} = request.body;



        const userService = new UserService();
        const user = await userService.save({email, password, name, workingArea, contact, picture, admin});

        if(user == "there is already a user with this email"){
            return response.status(422).json(user);
        }else{
            return response.status(200).json(user);
        }

    }
}

class UserLogin{
    async handle(request: Request, response: Response){
        const {email, password} = request.body;

        const userService = new UserService();
        const user = await userService.login({email, password});

        return response.json(user);
    }
}

export {UserRegistration, UserLogin}