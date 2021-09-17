import { Repository, EntityRepository } from "typeorm";
import { Office } from "../entities/Office";

@EntityRepository(Office)
class OfficeRepositories extends Repository<Office>{

}

export {OfficeRepositories}