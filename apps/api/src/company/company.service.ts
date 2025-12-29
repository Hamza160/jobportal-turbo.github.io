import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {RegisterCompanyDto} from "./dto/company.dto";

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
}
