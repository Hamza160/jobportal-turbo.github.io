import {Body, Controller, Get, Param, Post, Query, Req, UseGuards} from '@nestjs/common';
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

    @Get(':id')
    async getJobById(@Param('id') id: string) {
        const job = await this.jobService.getJobById(id)

        return {
            success: true,
            job
        }
    }

    // get job by userId
    @UseGuards(JwtAuthGuard)
    @Get('admin')
    async getJobByUserId(@Req() req) {
        const userId = req.user.id;
        const result = await this.jobService.getJobByUserId(userId);

        return {
            success: true,
            result
        }
    }

    // Add Favourite Jobs
    @UseGuards(JwtAuthGuard)
    @Post('favourite/:id')
    async createFavouriteJob(@Param('id') jobId: string, @Req() req) {
        const userId = req.user.id;
        const result = await this.jobService.createFavourite(jobId, userId);

        return {
            success: true,
            result
        }
    }

    // get All Favourites
    @UseGuards(JwtAuthGuard)
    @Get('favourites')
    async getFavouritesJob(@Req() req: any) {
        const userId = req.user.id as string;
        const result = await this.jobService.getFavourites(userId);

        return {
            success: true,
            message: `Jobs fetced successfully.`,
            result
        }
    }
}
