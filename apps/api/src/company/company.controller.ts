import {Body, Controller, Post, UseGuards, Req} from '@nestjs/common';
import {CompanyService} from "./company.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RegisterCompanyDto} from "./dto/company.dto";

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @UseGuards(JwtAuthGuard)
    @Post('register')
  async registerCompany(
    @Req() req,
    @Body() registerCompanyDto: RegisterCompanyDto,
  ) {
        const userId = req.user.id;
        const result = await this.companyService.registerCompany(userId, registerCompanyDto);

        return {
            success: true,
            message: `Company registered`,
            company: result,
        }
    }
}
