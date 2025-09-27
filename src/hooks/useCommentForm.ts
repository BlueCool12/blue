import { useState } from "react";

export interface CommentFormValues {
    nickname: string;
    password: string;
    content: string;
}

export function useCommentForm(initialValues: Partial<CommentFormValues> = {}, maxLength = 200) {
    const [form, setForm] = useState<CommentFormValues>({
        nickname: initialValues.nickname ?? "",
        password: initialValues.password ?? "",
        content: initialValues.content ?? "",
    });

    const isOver = form.content.length >= maxLength;

    const handleChange = (field: keyof CommentFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = e.target.value;

        if (field === "password" && !/^\d*$/.test(value)) return;

        if (field === "content" && value.length > maxLength) {
            value = value.slice(0, maxLength);
        }

        setForm(prev => ({ ...prev, [field]: value }));
    };

    return { form, setForm, handleChange, isOver, maxLength };
}