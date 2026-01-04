import {IsNotEmpty, IsString, IsEnum} from "class-validator";
import {ApplicationStatus} from "@prisma/client";

export class ApplyJobDto {
    @IsNotEmpty()
    @IsString()
    jobId: string;
}

export class UpdateStatusDto {
    @IsNotEmpty()
    @IsEnum(['pending', 'accepted', 'rejected'])
    status: ApplicationStatus;
}