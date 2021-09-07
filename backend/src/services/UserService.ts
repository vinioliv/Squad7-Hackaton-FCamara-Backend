import { getCustomRepository } from "typeorm";
import { UserRespositories } from "../repositories/UserRepositories";

interface IUserRequestRegister{
    email: string;
    password: string;
    name: string;
    workingArea: string;
    contact: string;
    picture: string;
    admin?: boolean;
}


interface IUserRequestLogin{
    email: string;
    password: string;
}

class UserService{
    async save({email, password, name, workingArea, contact, picture, admin} : IUserRequestRegister){
        const userRepository = getCustomRepository(UserRespositories);

        const userAlreadyExists = await userRepository.findOne({
            email
        })

        console.log(userAlreadyExists);
        if(userAlreadyExists){
            return "there is already a user with this email";
        }

        const newUser = userRepository.create({
            email,
            password,
            name,
            workingArea,
            contact,
            picture,
            admin
        })

       return await userRepository.save(newUser);
    }

    async login({email, password} : IUserRequestLogin){
        const userRepository = getCustomRepository(UserRespositories); 

        const userExists = await userRepository.findOne({
            email
        })
        if(userExists){
            const correctCredentials = await userRepository.findOne({
                email,
                password
            })
            if(correctCredentials){
                return "Welcome " + correctCredentials.name;
            }else{
                return "incorrect email or password";
            }
        }else{
            return "e-mail not registered in the application";
        }
    }
}

export{UserService}