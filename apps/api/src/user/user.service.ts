import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {RegisterUserDto, UpdateUserDto} from './dto/user.dto';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {
    }

    async register(registerUserDto: RegisterUserDto) {
        const {fullName, email, phoneNumber, password} = registerUserDto;

        if (!fullName || !email || !phoneNumber || !password) {
            throw new BadRequestException('All fields are required');
        }

        const existingUser = await this.prisma.user.findUnique({
            where: {email},
        });

        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                ...registerUserDto,
                password: hashedPassword,
            },
        });

        return {user, success: true, message: 'User registered successfully'};
    }

    async login(email: string, password: string, role: string) {
        if (!email || !password || !role) {
            throw new BadRequestException('All fields are required');
        }

        const user = await this.prisma.user.findUnique({
            where: {email},
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            throw new BadRequestException('Invalid Credentials');
        }

        if (role !== user.role) {
            throw new BadRequestException("Account doesn't exist with current role");
        }

        const token = this.jwtService.sign(
            {userId: user.id, role: user.role},
            {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d',
            },
        );

        return {
            success: true,
            message: 'Logged in successfully',
            token,
            user,
        };
    }

    async logout(): Promise<{ message: string; success: boolean }> {
        return {
            success: true,
            message: 'Logged out successfully',
        };
    }

    async updateProfile(id: string, updateUserDto: UpdateUserDto) {
        const {fullName, email, phoneNumber, profileBio, profileSkills, profileResume, profilePhoto} = updateUserDto;

        if (!fullName || !email || !phoneNumber || !profileBio || !profileSkills) {
            throw new BadRequestException('All fields are required');
        }

        const user = await this.prisma.user.update({
            where: {id},
            data: {
        fullName,
        email,
        phoneNumber,
        profileBio,
        profileSkills,
        profileResume,
        profilePhoto,
            }
        })

        return user;
    }
}
