
import { getCustomRepository } from "typeorm";
import { ScheduleRepositories } from "../repositories/ScheduleRepositories";


interface IScheduleAvailable {
    office_id: number;
    schedule_date: Date;
}

interface IScheduleSave {
    user_id: number;
    office_id: number;
    schedule_date: Date;
}

class ScheduleService {
    async consultVacancies({ office_id, schedule_date }: IScheduleAvailable) {

        const scheduleRepository = getCustomRepository(ScheduleRepositories);

        const dayMonthYear = schedule_date.toString().split('/', 3);

        const dt = new Date(Date.parse(`${dayMonthYear[1]}/01/${dayMonthYear[2]}`));
        const totalDays = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
        const totalDaysTillEnd = totalDays - Number(dayMonthYear[0]);


        function incrementDay(day: any, i) {
            let teste = Number(day);
            return teste += i;
        }

        var daysAllowed = [,];
        var daysAllowedCount = 0;

        var daysNotAllowed = [,];
        var daysNotAllowedCount = 0;

        for (let i = 0; i <= totalDaysTillEnd; ++i) {

            var [query, count] = await scheduleRepository.findAndCount({
                where: {
                    office_id: office_id,
                    schedule_date: dayMonthYear[2] + "-" + dayMonthYear[1] + "-" + incrementDay(dayMonthYear[0], i) + " 00:00:00"
                },
                relations: ["office"]
            });
            if (count > 0) {
                const percentageAllowed = query[0].office.percentage_allowed;
                const quantityConsultants = query[0].office.qt_consultants;
                const quantityAllocated = count;

                const quantityAllowed = ((quantityConsultants * percentageAllowed) / 100) - quantityAllocated;
                const availablePercentage = (quantityAllowed - quantityAllocated) * 100 / quantityAllowed;

                if (quantityAllowed == 0) {
                    daysNotAllowed[daysNotAllowedCount] = {
                        daysNotAllowed: incrementDay(dayMonthYear[0], i),
                        percentageAllowed: 0
                    };
                    daysNotAllowedCount++;
                } else {
                    daysAllowed[daysAllowedCount] = {
                        daysAllowed: incrementDay(dayMonthYear[0], i),
                        percentageAllowed: availablePercentage
                    };
                    daysAllowedCount++;
                }
            } else {
                daysAllowed[daysAllowedCount] = {
                    daysAllowed: incrementDay(dayMonthYear[0], i),
                    percentageAllowed: 100
                };
                daysAllowedCount++;
            }
        }
        return { daysAllowed, daysNotAllowed };
    }

    async saveSchedule({ user_id, office_id, schedule_date }: IScheduleSave) {
        const scheduleRepository = getCustomRepository(ScheduleRepositories);

        console.log(user_id, office_id, schedule_date);
        const dayMonthYear = schedule_date.toString().split('/', 3);

        const alreadyScheduled = await scheduleRepository.findOne({
            where: {
                user_id: user_id,
                office_id: office_id,
                schedule_date: dayMonthYear[2] + "-" + dayMonthYear[1] + "-" + dayMonthYear[0] + " 00:00:00"
            },
            relations: ["office", "user"]
        })

        if (alreadyScheduled) {
            return { msg: "you have already made an appointment for this day!" }
        }

        const newSchedule = scheduleRepository.create({
            user_id,
            office_id,
            schedule_date: dayMonthYear[2] + "-" + dayMonthYear[1] + "-" + dayMonthYear[0] + " 00:00:00"
        })
        await scheduleRepository.save(newSchedule);
        return { msg: "The schedule was successful!" }

    }
}


export { ScheduleService };