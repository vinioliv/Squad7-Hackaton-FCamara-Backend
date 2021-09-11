import { Entity, EntityRepository, Repository} from "typeorm";
import { Schedule } from "../entities/Schedule";

@EntityRepository(Schedule)
class ScheduleRepositories extends Repository<Schedule>{

}

export{ScheduleRepositories}