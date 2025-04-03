
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
    Candidate=0,
    Employer=1
}
