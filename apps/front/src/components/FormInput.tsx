import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type Props = {
    label: string;
    type: string;
    name: string;
    value?: string;
    placeholder?: string;
    onChange?: () => void;
    defaultValue?: string;
}

const FormInput = ({label, type, value, onChange, name, placeholder, defaultValue}: Props) => {
    return (
        <div className="my-1">
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
            />
        </div>
    );
}

export default FormInput;