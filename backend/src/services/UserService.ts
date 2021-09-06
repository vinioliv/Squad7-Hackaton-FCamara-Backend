import { getCustomRepository } from "typeorm";
import { UserRespositories } from "../repositories/UserRepositories";

interface IUserRequest{
    email: string;
    password: string;
    name: string;
    workingArea: string;
    contact: string;
    picture: string;
    admin?: boolean;
}

class UserService{
    async save({email, password, name, workingArea, contact, picture, admin} : IUserRequest){
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
}

export{UserService}