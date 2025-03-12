
export class User {
    constructor(
        public fullName: string,       
        public email: string,  
        public phone: string,
        public passwordHash: string,   
        public role: userRole,
        public id?: number,

    ) {}
}

export enum userRole{
    Employer=0,
    Candidate=1
}
