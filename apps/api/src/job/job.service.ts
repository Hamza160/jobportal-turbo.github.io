import {BadRequestException, Injectable, NotFoundException, ParseIntPipe} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {PostJobDto} from "./dto/job.dto";
import {Job} from "@prisma/client";

@Injectable()
export class JobService {
    constructor(private prisma: PrismaService) {
    }

    async postJob(createdById: string, postJobDto: PostJobDto) {
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
            data: {
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

        if (!job) {
            throw new BadRequestException("Job not created");
        }

        return job;
    }

    async getAllJobs(query: any) {
        const {keyword, location, jobType, salary} = query;

        const salaryRange = salary?.split("-");

        let jobs: Job[] = [];

        if (keyword || location || jobType || salary) {
            jobs = await this.prisma.job.findMany({
                where: {
                    ...(keyword && {
                        OR: [
                            {title: {contains: keyword, mode: 'insensitive'}},
                            {description: {contains: keyword, mode: 'insensitive'}}
                        ]
                    }),
                    ...(location && {
                        location: {contains: location, mode: 'insensitive'},
                    }),
                    ...(jobType && {
                        jobType: {contains: jobType, mode: 'insensitive'},
                    }),
                    ...(salary && salaryRange?.length && {
                        salary: {
                            gte: parseInt(salaryRange[0], 10),
                            lte: parseInt(salaryRange[1], 10),
                        }
                    })
                },
                include: {company: true},
                orderBy: {createdAt: 'desc'}
            })
        } else {
            jobs = await this.prisma.job.findMany({
                skip: 0,
                take: 6
            })
        }

        if (!jobs || jobs.length === 0) {
            throw new NotFoundException("Jobs are not found");
        }

        return jobs;
    }

    async getJobById(id: string) {
        const job = await this.prisma.job.findUnique({
            where: {id}
        })

        if (!job) {
            throw new NotFoundException("Job not found");
        }

        return job;
    }

    async getJobByUserId(createdById: string) {
        const job = await this.prisma.job.findMany({
            where: {createdById},
            include: {company: true},
            orderBy: {createdAt: 'desc'}
        })

        if (!job) {
            throw new NotFoundException("Job not found");
        }

        return job;
    }

    // create favourite
    async createFavourite(jobId: string, userId: string) {
        let newFav: any;
        try {
            const fav = await this.prisma.favourite.findFirst({
                where: {
                    jobId,
                    userId,
                }
            })
            if (fav) {
                throw new NotFoundException("This job is already in favourite");
            }

            newFav = await this.prisma.favourite.create({
                data: {
                    userId,
                    jobId,
                }
            });

            if (!newFav) {
                throw new NotFoundException("Job not added in favourite");
            }
            return newFav;
        } catch (err) {
            throw new NotFoundException("Job not added in favourite");
        }
    }

    async getFavourites(userId: any) {
        try {
            const jobs = await this.prisma.favourite.findMany({
                where: {
                    userId,
                },
                include: {
                    job: {
                        include: {company: true}
                    }
                }
            })

            if (!jobs?.length) {
                throw new NotFoundException("Job not found");
            }
            return jobs;
        } catch (err) {
            throw new NotFoundException("Job not found");
        }
    }
}
