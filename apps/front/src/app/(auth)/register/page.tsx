"use client"
import React from 'react';
import FormInput from "@/components/FormInput";
import {Label} from "@/components/ui/label";
import {AvatarImage, Avatar, AvatarFallback} from "@/components/ui/avatar";
import {XIcon} from "lucide-react";
import SelectForm from "@/components/SelectForm";

export default function RegisterPage() {
    const [profile, setProfile] = React.useState({profileBio: "", profilePhoto: ""})
    const [resume, setResume] = React.useState({profileResume: "", profileResumeOriginalName: ""})
    return (
        <form>
            <h1 className="font-bold text-2xl mb-4 text-yellow-400 text-center">Sign Up</h1>
            <FormInput
                label={'Full Name'}
                type={'text'}
                name={'fullName'}
                placeholder={'Enter your full name'}
            />
            <FormInput
                label={'Email'}
                type={'email'}
                name={'email'}
                placeholder={'Enter your email'}
            />
            <FormInput
                label={'Phone Number'}
                type={'text'}
                name={'phoneNumber'}
                placeholder={'Enter your full name'}
            />
            <FormInput
                label={'Password'}
                type={'password'}
                name={'password'}
                placeholder={'Enter your password'}
            />
            {profile?.profilePhoto ? (
                <>
                    <Label htmlFor="profilePhoto">Profile Photo</Label>
                    <div>
                        <Avatar>
                            <AvatarImage/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <XIcon
                            size={14}
                            className="absolute -top-1 -right-1 z-10 cursor-pointer"
                            onClick={() => setProfile({profileBio: "", profilePhoto: ""})}
                        />
                    </div>
                </>
            ) : (
                <FormInput
                    label={'Upload Photo'}
                    type={'file'}
                    name={'picture'}
                    placeholder={''}
                />
            )}
            <FormInput
                label={'Profile Skills'}
                type={'text'}
                name={'profileSkills'}
            />
            {resume?.profileResume ? (
                <>
                    <Label htmlFor="resumeResume">Resume</Label>
                    <div>
                        <object data={resume?.profileResume} type="application/pdf" width="50%" height="50%"></object>
                        <p>Alternative text - include a link <a href={resume?.profileResume}>to the PDF</a></p>
                        <XIcon
                            size={14}
                            className="absolute -top-1 -right-1 z-10 cursor-pointer"
                            onClick={() => setResume({profileResume: "", profileResumeOriginalName: ""})}
                        />
                    </div>
                </>
            ) : (
                <FormInput
                    label={'Upload resume'}
                    type={'file'}
                    name={'resume'}
                />
            )}
            <SelectForm
                name="role"
                placeholder={'Select your role'}
                list={["student", "recruiter"]}
            />
        </form>
    );
}

