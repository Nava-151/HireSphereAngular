import { Filter } from "./filter";
import { User } from "./user";

export class UserResumeDetails{
    education: any;
    constructor(
        public  id:number ,
        public  candidateId:number ,
        public  fileKey: string, // מפתח הקובץ ב-S3
        public  idResponse:number,
        public candidate:User,
        public response:Filter,
    ){
    }
}