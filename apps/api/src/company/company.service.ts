import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {RegisterCompanyDto, UpdateCompanyDto} from "./dto/company.dto";

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) {
    }

    async registerCompany(userId: string, registerCompanyDto: RegisterCompanyDto) {
        const {name, description, website, location, logo} = registerCompanyDto;
        const existingCompany = await this.prisma.company.findUnique({
            where: {name}
        })

        if (existingCompany) {
            throw new BadRequestException("Company's name already exists");
        }

        return await this.prisma.company.create({
            data: {
                userId,
                name, description, website, location, logo
            }
        })

    }

    async getCompanies(userId: string) {
        return this.prisma.company.findMany({
            where: {
                userId
            }
        })
    }

    async getCompanyById(id: string) {
        const company = this.prisma.company.findUnique({
            where:{id}
        })

        if (!company) {
            throw new NotFoundException('Company not found');
        }

        return company
    }

    async deleteCompany(id: string) {
        const company = this.prisma.company.delete({
            where:{id}
        })

        if (!company) {
            throw new NotFoundException('Company not found');
        }

        return company
    }

    async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
        const company = await this.prisma.company.update({
            where:{id},
            data:updateCompanyDto
        })

        if (!company) {
            throw new NotFoundException('Company not found');
        }
        return company
    }
}
