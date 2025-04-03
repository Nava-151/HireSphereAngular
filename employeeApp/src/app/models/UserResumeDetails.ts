export class UserResumeDetails{
    constructor(
        public  id:number ,
        public  candidateId:number ,
        public  fileKey: string, // מפתח הקובץ ב-S3
        public  idResponse:number
    ){
    }
}