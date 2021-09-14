import { Request, Response } from "express";
import { ScheduleService } from "../services/ScheduleService";


class ScheduleAvailable {
    async handle(request: Request, response: Response) {
        const { office_id, schedule_date } = request.body;
        const user_id = Number(request.headers.authorization);

        const scheduleService = new ScheduleService();

        const scheduleAvailable = await scheduleService.consultVacancies({ user_id, office_id, schedule_date });

        return response.json(scheduleAvailable);
    }
}

class SaveSchedule {
    async handle(request: Request, response: Response) {
        const { office_id, schedule_date } = request.body;
        const user_id = Number(request.headers.authorization);

        const scheduleService = new ScheduleService();
        const scheduleSaved = await scheduleService.saveSchedule({ user_id, office_id, schedule_date })

        return response.json(scheduleSaved);
    }
}

class DeleteSchedule {
    async handle(request: Request, response: Response) {
        const { office_id, schedule_date } = request.body;
        const user_id = Number(request.headers.authorization);

        const scheduleService = new ScheduleService();
        const scheduleDeleted = await scheduleService.deleteSchedule({ user_id, office_id, schedule_date })

        if(scheduleDeleted.error == "Operation not permitted"){
            return response.status(401).json(scheduleDeleted);

        }else{
        return response.json(scheduleDeleted);
        }
    }
}

class ScheduleHistory{
    async handle(request: Request, response: Response){
        const user_id = Number(request.headers.authorization);

        const scheduleService = new ScheduleService();
        const scheduleHistory = await scheduleService.scheduleHistory({user_id})

        return response.json(scheduleHistory);
    }
}
export { ScheduleAvailable, SaveSchedule, DeleteSchedule, ScheduleHistory }