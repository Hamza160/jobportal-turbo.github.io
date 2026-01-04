import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateStatusDto } from './dto/application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async apply(@Req() req, @Param('id') jobId: string) {
    const userId = req.user.id!;
    const application = await this.applicationService.applyJob(userId, jobId);

    return {
      success: true,
      message: 'Job Applied successfully',
      application,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAppliedJobs(@Req() req) {
    const userId = req.user.id as string;
    const applications = await this.applicationService.getAppliedJobs(userId);
    return {
      success: true,
      applications,
    };
  }

  @Get(':id')
  async getApplicants(@Req() req, @Param('id') jobId: string) {
    const job = await this.applicationService.getApplicants(jobId);
    return {
      success: true,
      job,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    const updateApplication = await this.applicationService.updateStatus(id, updateStatusDto);
    return {
        success: true,
        updateApplication
    }
  }
}
