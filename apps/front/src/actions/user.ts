"use server"

export const register = async (formData: FormData, profile: { profileBio?: string, profilePhoto?: string }, resume: {
    profileResume?: string,
    profileResumeOriginalName?: string
}) => {
    const fullName = formData.get("fullName")
    const email = formData.get("email")
    const password = formData.get("password")
    const profileSkills = formData.get("profileSkills")
    const profileResume = resume?.profileResume
    const profileResumeOriginalName = resume?.profileResumeOriginalName
    const profileBio = profile?.profileBio
    const profilePhoto = profile?.profilePhoto
    const role = formData.get("role")

    console.log({fullName, email, password, profileSkills, profileResume, profileResumeOriginalName, profileResume, profileBio, profileResume, profilePhoto, role
    })
    if (!fullName || !email || !password || !profileSkills || !profileResume || !profileResumeOriginalName || !profileResume || !profileBio || !profileResume || !profilePhoto || !role) {
        return {error: "Please fill all the fields"}
    }

    try {
        const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName,
                email,
                password,
                profileBio,
                profilePhoto,
                role,
                profileResume,
                profileResumeOriginalName,
            }),
            cache: "no-cache"
        })

        return await user.json();
    } catch (e) {
        return {error: error?.response?.data?.message}
    }
}