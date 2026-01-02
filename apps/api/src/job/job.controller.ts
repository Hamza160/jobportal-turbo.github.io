import {Body, Controller, Get, Post, Query, Req, UseGuards} from '@nestjs/common';
import {JobService} from "./job.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {PostJobDto} from "./dto/job.dto";

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async postJob(@Req() req, @Body() postJohDto: PostJobDto) {
        const userId = req.user.id;
        const job = await this.jobService.postJob(userId, postJohDto);

        return {
            success: true,
            message: `Job created successfully.`,
            job,
        }
    }

    @Get()
    async getAllJobs(@Query() query: string) {
        const jobs = await this.jobService.getAllJobs(query);
        return {
            success: true,
            message: `Jobs fetched successfully.`,
            jobs,
        }
    }


}
