import { Timeslot } from './timeslot';

export class Module{
    id: number;
    moduleName: string;
    lecturerName: string;
    description: string;
    timeslots: Timeslot[];

    constructor(values: Object = {}){
        Object.assign(this,values);
    }
}