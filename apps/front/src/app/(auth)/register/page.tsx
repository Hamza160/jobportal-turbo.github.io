import React from 'react';
import FormInput from "@/components/FormInput";

export default function RegisterPage() {
  return (
    <form>
        <h1 className="font-bold text-2xl mb-4 text-yellow-400 text-center">Sign Up</h1>
        <FormInput
            label={'Full Name'}
            type={'text'}
            name={'fullName'}
            placeholder={'Enter your full name'}
        /><FormInput
            label={'Email'}
            type={'email'}
            name={'email'}
            placeholder={'Enter your email'}
        /><FormInput
            label={'Phone Number'}
            type={'text'}
            name={'phoneNmber'}
            placeholder={'Enter your full name'}
        /><FormInput
            label={'Full Name'}
            type={'text'}
            name={'fullName'}
            placeholder={'Enter your full name'}
        />
    </form>
  );
}

