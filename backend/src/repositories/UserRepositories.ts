import { EntityRepository, Repository } from "typeorm";
import {User} from "../entities/User";

@EntityRepository(User)
class UserRespositories extends Repository<User>{

}
export {UserRespositories}