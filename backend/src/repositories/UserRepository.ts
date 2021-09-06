import { EntityRepository, Repository } from "typeorm";
import {User} from "../entities/Users";

@EntityRepository(User)
class UserRespositories extends Repository<User>{

}
export {UserRespositories}