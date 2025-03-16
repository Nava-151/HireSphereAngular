export class UserResumeDetails{
    constructor(
        public  Id:number ,
        public  CandidateId:number ,
        public  FileKey: string, // מפתח הקובץ ב-S3
        public  IdResponse:number
    ){
    }
}