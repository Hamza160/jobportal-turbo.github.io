import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {PostJobDto} from "./dto/job.dto";

@Injectable()
export class JobService {
    constructor(private prisma: PrismaService) {}

    async postJob(createdById:string, postJobDto:PostJobDto) {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            position,
            experienceLevel,
            companyId,
        }
            =
            postJobDto;

        const job = await this.prisma.job.create({
            data:{
                title,
                description,
                requirements,
                salary,
                location,
                jobType,
                position,
                experienceLevel,
                companyId,
                createdById
            }
        })

        if(!job){
            throw new BadRequestException("Job not created");
        }

        return job;
    }
}
