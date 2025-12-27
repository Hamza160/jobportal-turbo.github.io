import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {RegisterUserDto} from "./dto/user.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {
    }

    async register(registerUserDto: RegisterUserDto) {
        const {
            fullName,
            email,
            phoneNumber,
            password,
            profileBio,
            profileSkills,
            profileResume,
            profileResumeOriginalName,
            profilePhoto,
            role
        } = registerUserDto;

        if (!fullName || !email || !phoneNumber || !password) {
            throw new BadRequestException("All fields are required");
        }

        const existingUser = await this.prisma.user.findUnique({
            where:{email}
        })
    }
}

















