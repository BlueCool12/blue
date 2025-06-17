import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import styled from "styled-components";
import { OutlineButton } from "../common/OutlineButton";

import { CategorySelector } from "./CategorySelector";

import type { PostFormValues } from "@/types/post";

const CKEditor = dynamic(() => import('./editor/Editor'), {
    ssr: false,
});

interface PostFormProps {
    initialData?: PostFormValues;
    onSubmit: (post: PostFormValues) => void;
    mode: 'create' | 'edit';
}

const DEFAULT_POST: PostFormValues = {
    title: '',
    content: '',
    categories: [],
    isPublic: true,
}

export const PostForm = ({ initialData, onSubmit, mode }: PostFormProps) => {

    const [post, setPost] = useState<PostFormValues>(() => initialData ?? DEFAULT_POST);

    useEffect(() => {
        if (initialData) setPost(initialData);
    }, [initialData]);

    return (
        <>
            <EditorWrapper>
                <Form>

                    <CategorySelector
                        values={post.categories}
                        onChange={(ids: number[]) =>
                            setPost((prev) => ({
                                ...prev,
                                categories: ids,
                            }))
                        }
                    />

                    <CategoryRow>
                        <TitleInput
                            value={post.title}
                            onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
                        />

                        <CheckboxLabel>
                            <input
                                type="checkbox"
                                checked={post.isPublic}
                                onChange={(e) => setPost((prev) => ({ ...prev, isPublic: e.target.checked }))}
                            />
                            공개
                        </CheckboxLabel>
                    </CategoryRow>

                    <CKEditor
                        initialData={post.content}
                        onChange={(value) => {
                            setPost((prev) => ({ ...prev, content: value }))
                        }}
                    />

                    <ButtonRow>
                        {/* <OutlineButton type="button" label="임시 저장" /> */}
                        <OutlineButton type="button" label={mode === 'create' ? '글 작성' : '글 수정'} onClick={() => onSubmit({ ...post, categories: post.categories })} />
                    </ButtonRow>
                </Form>
            </EditorWrapper >
        </>
    );
}

const EditorWrapper = styled.div`
    display: flex;
    justify-content: center;  
    align-items: center;    
    padding: 40px 24px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;    
`;

const Form = styled.div`
    width: 100%;    
    max-width: 720px;
    min-width: 320px;    
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const CategoryRow = styled.div`
    display: flex;    
    gap: 8px;
    align-items: center;    
`;

const TitleInput = styled.input`
    padding: 10px;
    font-size: 18px;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    width: 100%;
`;

const CheckboxLabel = styled.label`        
    display: flex;
    align-items: center;
    gap: 4px;
    
    font-size: 16px;        
    white-space: nowrap;

    input[type="checkbox"] {
        transform: scale(1.2);
        margin: 0;        
    }
`;

const ButtonRow = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;