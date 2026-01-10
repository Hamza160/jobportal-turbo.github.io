"use client"
import React, {useEffect} from 'react';
import FormInput from "@/components/FormInput";
import {Label} from "@/components/ui/label";
import {AvatarImage, Avatar, AvatarFallback} from "@/components/ui/avatar";
import {XIcon} from "lucide-react";
import SelectForm from "@/components/SelectForm";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {register} from "@/actions/user";
import {useLocalStorage} from "@mantine/hooks";
import uploadFile from "@/lib/uploadFile";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [profile, setProfile] = React.useState({profileBio: "", profilePhoto: ""})
    const [resume, setResume] = React.useState({profileResume: "", profileResumeOriginalName: ""})
    const router = useRouter()
    const [user] = useLocalStorage({
        key: 'userData',
        defaultValue: {},
    });

    useEffect(() => {
        if (user?.role === 'recruiter') {
            router.push("/admin/companies");
        } else if (user?.role === 'student') {
            router.push("/");
        }
    }, [])

    const handleUpload = async (event, type) => {
        const file = event.target.files?.[0];
        const name = file?.name?.split(".")?.[0]
        const upload = await uploadFile(file);

        if (type === 'profile') {
            setProfile({
                profileBio: name,
                profilePhoto: upload?.url,
            })
            toast.success("Image uploaded successfully.");
        } else {
            setResume({profileResume: upload?.url, profileResumeOriginalName: name})
            toast.success("Resume uploaded successfully.");
        }
    }

    const handleSubmit = async (formData: any) => {
        const response = await register(formData, profile, resume);
        if (response?.error) {
            toast?.error(response?.error)
        } else {
            router.push("/login");
        }
    }

    return (
        <div className="flex items-center justify-center max-w-7xl mx-auto mb-12">
            <form onSubmit={async (e) => {
                e.preventDefault();

                const formData = new FormData(e.currentTarget);
                await handleSubmit(formData);
            }} className="w-1/2 border border-gray-200 rounded p-4 bg-gray-100 my-6 mx-auto">
                <h1 className="font-bold text-2xl mb-4 text-yellow-400 text-center flex flex-col gap-2">Sign Up</h1>
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
                        <div className={"relative h-20 w-20 mt-1"}>
                            <Avatar className="w-full h-full">
                                <AvatarImage src={profile?.profilePhoto} alt={"Image"}/>
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
                        onChange={(event) => handleUpload(event, "profile")}
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
                        <div className="h-20 relative mt-1">
                            <object data={resume?.profileResume} type="application/pdf" width="50%"
                                    height="50%"></object>
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
                        onChange={(event) => handleUpload(event, "resume")}

                    />
                )}
                <SelectForm
                    name="role"
                    placeholder={'Select your role'}
                    list={["student", "recruiter"]}
                />
                <Button type="submit" className="w-full my-4 bg-yellow-400/90 hover:bg-yellow-400/95">Sign Up</Button>
                <span>Already have an account? <Link href='/login'>Login</Link></span>
            </form>
        </div>
    );
}

