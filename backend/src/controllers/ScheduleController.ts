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

export {ScheduleAvailable}