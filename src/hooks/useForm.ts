import {useState, ChangeEvent} from 'react';
import {UseFormReturn} from "../types/ComponentTypes";

export function useForm<T extends Record<string, any>>(initialValues: T): UseFormReturn<T> {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const reset = () => {
        setValues(initialValues);
    };

    return { values, handleChange, setValues, reset };
}
