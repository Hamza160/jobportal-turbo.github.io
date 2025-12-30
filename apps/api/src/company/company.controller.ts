import {Body, Controller, Post, UseGuards, Req, Res, Get, Param, NotFoundException, Delete, Put} from '@nestjs/common';
import {CompanyService} from "./company.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RegisterCompanyDto, UpdateCompanyDto} from "./dto/company.dto";

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {
    }

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

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCompanies(@Req() req) {
        const userId = req.user.id;
        const result = await this.companyService.getCompanies(userId);
        return {
            success: true,
            result,
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getCompany(@Req() req, @Param('id') companyId: string) {
        const result = await this.companyService.getCompanyById(companyId);

        return {
            success: true,
            result,
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCompany(@Req() req, @Param('id') companyId: string) {
        const result = await this.companyService.deleteCompany(companyId);


        return {
            message: 'Company deleted successfully',
            success: true,
            result,
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCompany(@Req() req, @Param('id') companyId: string, @Body() updateCompanyDto: UpdateCompanyDto) {
        const result = await this.companyService.updateCompany(companyId, updateCompanyDto);

        return {
            message: 'Company updated successfully',
            success: true,
            result,
        }
    }
}
