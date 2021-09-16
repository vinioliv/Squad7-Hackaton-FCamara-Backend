
import { getCustomRepository } from "typeorm";
import { OfficeRepositories } from "../repositories/OfficeRepositories";
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
interface IScheduleDelete {
    user_id: number;
    office_id: number;
    schedule_date: Date;
}
interface IscheduleHistory {
    user_id: number
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

        //função necessária caso não haja nenhum agendamento ainda
        async function howManyAllowed(office_id) {
            const officeRepository = getCustomRepository(OfficeRepositories)
            const data = await officeRepository.findOne({
                where: {
                    id: office_id
                }
            });

            const howMany = (data.qt_consultants * data.percentage_allowed) / 100;
            return howMany;

        }


        const scheduleRepository = getCustomRepository(ScheduleRepositories);

        const scheduledDay = await scheduleRepository.find({
            where: {
                office_id: office_id,
                user_id: user_id
            }
        })


        if (scheduledDay.length > 0) {

            var scheduledMap = scheduledDay.map(data => ({
                scheduledDay: splitDate(data.schedule_date)
            }));
        }


        var onlyDate = scheduledMap.sort(function (a, b) {
            return a.scheduledDay < b.scheduledDay ? -1 : a.scheduledDay > b.scheduledDay ? 1 : 0;
        })


        const dayMonthYear = schedule_date.toString().split('/', 3);


        const dt = new Date(Date.parse(`${dayMonthYear[1]}/01/${dayMonthYear[2]}`));
        const totalDays = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
        const totalDaysTillEnd = totalDays - Number(dayMonthYear[0]);



        var daysAllowed = [];
        var daysNotAllowed = [];

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
                const quantityAllowed = ((quantityConsultants * percentageAllowed) / 100) - quantityAllocated;
                const availablePercentage = (quantityAllowed * 100) / percentageAllowed;


                var marked;
                if (quantityAllowed == 0) {
                    if (onlyDate[countOnlyDate].scheduledDay == diaIncrementado) {
                        marked = true;
                        countOnlyDate++;
                    } else {
                        marked = false;
                    }
                    daysNotAllowed[countDaysNotAllowed] = {
                        dayNotAllowed: incrementDay(dayMonthYear[0], i),
                        percentageAllowed: quantityAllowed ? Number(availablePercentage.toFixed(1)) : 0,
                        remainingAmount: quantityAllowed,
                        scheduledByUser: marked == true ? true : false
                    };
                    countDaysNotAllowed++;
                } else {
                    daysAllowed[countDaysAllowed] = {
                        dayAllowed: incrementDay(dayMonthYear[0], i),
                        percentageAllowed: Number(availablePercentage.toFixed(1)),
                        remainingAmount: quantityAllowed,
                        scheduledByUser: scheduledDay.length > 0 && scheduledDay.length >= countOnlyDate ? scheduledByUser(onlyDate[countOnlyDate].scheduledDay, diaIncrementado) : false,
                    };
                    countDaysAllowed++;
                }
            } else {
                daysAllowed[countDaysAllowed] = {
                    dayAllowed: incrementDay(dayMonthYear[0], i),
                    percentageAllowed: 100,
                    remainingAmount: await howManyAllowed(office_id),
                    scheduledByUser: false
                };
                countDaysAllowed++;
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

    async deleteSchedule({ user_id, office_id, schedule_date }: IScheduleDelete) {
        const scheduleRepository = getCustomRepository(ScheduleRepositories);

        const dayMonthYear = schedule_date.toString().split('/', 3);

        const theresSchedule = await scheduleRepository.findOne({
            where: {
                user_id: user_id,
                office_id: office_id,
                schedule_date: dayMonthYear[2] + "-" + dayMonthYear[1] + "-" + dayMonthYear[0] + " 00:00:00"
            },
            relations: ["office", "user"]
        })


        if (!theresSchedule) {
            return { error: "Operation not permitted" };
        }

        const removeSchedule = scheduleRepository.create({
            user_id,
            office_id,
            schedule_date: dayMonthYear[2] + "-" + dayMonthYear[1] + "-" + dayMonthYear[0] + " 00:00:00"
        });

        await scheduleRepository.delete(removeSchedule);
        return { msg: "The schedule was deleted!" }


    }

    async scheduleHistory({ user_id }: IscheduleHistory) {
        const scheduleRepository = getCustomRepository(ScheduleRepositories);

        const history = await scheduleRepository.find({
            where: {
                user_id: user_id
            },
            relations: ["office"]
        })
        console.log(history[0].schedule_date)
        console.log(history[0].office.name);

        if (history) {
            let result = history.map(data => ({
                scheduled_day: data.schedule_date,
                office: data.office.name
            }));

            return { result };
        } else {
            return "No schedule found!"
        }

    }

}


export { ScheduleService };