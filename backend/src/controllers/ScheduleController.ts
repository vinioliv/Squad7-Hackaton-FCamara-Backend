import {Request, Response} from "express";
import { ScheduleService } from "../services/ScheduleService";


class ScheduleAvailable{
    async handle(request: Request, response: Response){
        const {office_id, schedule_date} = request.body;
        
        const scheduleService = new ScheduleService();
        const scheduleAvailable = await scheduleService.consultVacancies({office_id, schedule_date});

        return response.json(scheduleAvailable);
    }
}

class SaveSchedule{
    async handle(request: Request, response:Response){
        const {office_id, schedule_date} = request.body;
        const user_id = Number(request.headers.authorization);

        const scheduleService = new ScheduleService();
        const scheduleSaved = await scheduleService.saveSchedule({user_id, office_id, schedule_date})

        return response.json(scheduleSaved);
    }
}

export {ScheduleAvailable, SaveSchedule}