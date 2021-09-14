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
        console.log(office_id, schedule_date);
        const scheduleSaved = await scheduleService.deleteSchedule({ user_id, office_id, schedule_date })

        if(scheduleSaved.error == "Operation not permitted"){
            return response.status(401).json(scheduleSaved);

        }else{
        return response.json(scheduleSaved);
        }
    }
}
export { ScheduleAvailable, SaveSchedule, DeleteSchedule }