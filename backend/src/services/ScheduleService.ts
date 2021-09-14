
import { getCustomRepository } from "typeorm";
import { ScheduleRepositories } from "../repositories/ScheduleRepositories";


interface IScheduleAvailable {
    user_id: number;
    office_id: number;
    schedule_date: Date;
}

interface IScheduleSave {
    user_id: number;
    office_id: number;
    schedule_date: Date;
}

class ScheduleService {
    async consultVacancies({ user_id, office_id, schedule_date }: IScheduleAvailable) {

        //functions
        function splitDate(scheduledDay) {
            const day = scheduledDay.toString().split(' ', 3);
            return day[2];
        }

        //increment 
        function incrementDay(day: any, i) {
            let incrementIt = Number(day);
            return incrementIt += i;
        }

        function scheduledByUser(dayScheduled, dayMonthYear) {
            if (dayScheduled.toString() == dayMonthYear.toString()) {
                countOnlyDate++
                return true;

            } else {
                return false;
            }

        }


        const scheduleRepository = getCustomRepository(ScheduleRepositories);

        const scheduledDay = await scheduleRepository.find({
            where: {
                office_id: office_id,
                user_id: user_id
            }
        })

        if (scheduledDay.length > 0) {
            ;
            var onlyDate = scheduledDay.map(data => ({
                scheduledDay: splitDate(data.schedule_date)
            }));
        }

        const dayMonthYear = schedule_date.toString().split('/', 3);


        const dt = new Date(Date.parse(`${dayMonthYear[1]}/01/${dayMonthYear[2]}`));
        const totalDays = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
        const totalDaysTillEnd = totalDays - Number(dayMonthYear[0]);



        var daysAllowed = [,];
        var daysNotAllowed = [,];

        var countDaysAllowed = 0;
        var countDaysNotAllowed = 0;
        var countOnlyDate = 0;



        for (let i = 0; i <= totalDaysTillEnd; ++i) {

            var [query, count] = await scheduleRepository.findAndCount({
                where: {
                    office_id: office_id,
                    schedule_date: dayMonthYear[2] + "-" + dayMonthYear[1] + "-" + incrementDay(dayMonthYear[0], i) + " 00:00:00"
                },
                relations: ["office"]
            });

            if (count > 0) {


                const diaIncrementado = incrementDay(dayMonthYear[0], i);


                const percentageAllowed = query[0].office.percentage_allowed;
                const quantityConsultants = query[0].office.qt_consultants;
                const quantityAllocated = count;


                const remainingAmount = quantityConsultants - quantityAllocated;

                const quantityAllowed = ((quantityConsultants * percentageAllowed) / 100) - quantityAllocated;
                const availablePercentage = (quantityAllowed - quantityAllocated) * 100 / quantityAllowed;

                if (quantityAllowed == 0) {
                    daysNotAllowed[countDaysNotAllowed] = {
                        dayNotAllowed: incrementDay(dayMonthYear[0], i),
                        percentageAllowed: quantityAllowed ? Number(availablePercentage.toFixed(0)) : 0,
                        remainingAmount: remainingAmount,
                        scheduledByUser: scheduledDay.length > 0 && scheduledDay.length >= countOnlyDate ? scheduledByUser(onlyDate[countOnlyDate].scheduledDay, diaIncrementado) : false,
                    };
                    countDaysNotAllowed++;
                    countOnlyDate++;
                } else {
                    daysAllowed[countDaysAllowed] = {
                        dayAllowed: incrementDay(dayMonthYear[0], i),
                        percentageAllowed: Number(availablePercentage.toFixed(0)),
                        remainingAmount: remainingAmount,
                        scheduledByUser: scheduledDay.length > 0 && scheduledDay.length >= countOnlyDate ? scheduledByUser(onlyDate[countOnlyDate].scheduledDay, diaIncrementado) : false,
                    };
                    countDaysAllowed++;
                    // countOnlyDate++;
                }
            } else {
                daysAllowed[countDaysAllowed] = {
                    daysAllowed: incrementDay(dayMonthYear[0], i),
                    percentageAllowed: 100,
                    remainingAmount: office_id == 1 ? 100 : 600,
                    scheduledByUser: false
                };
                countDaysAllowed++;
                // countOnlyDate++;
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
        });
        await scheduleRepository.save(newSchedule);
        return { msg: "The schedule was successful!" }

    }

}


export { ScheduleService };