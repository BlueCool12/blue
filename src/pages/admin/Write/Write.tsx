import { useState } from "react";

import { Editor } from "../../../components/admin/Editor";
import { OutlineButton } from '../../../components/common/OutlineButton';

import { postApi } from "../../../api/admin/postApi";

import styled from "styled-components";

const Write = () => {

    const [post, setPost] = useState({
        title: '',
        content: '',
        category: '',
        isPublic: true,
    });

    const handleSave = async () => {
        try {
            const result = await postApi.createPost(post);
            console.log("등록 성공", post.content);
            // 성공 후 로직
        } catch (error) {
            console.error("등록 실패", error);
            // 실패 후 로직
        }
    };

    return (
        <>
            <EditorWrapper>
                <Form>
                    <CategoryRow>
                        <Select
                            value={post.category}
                            onChange={(e) => setPost((prev) => ({ ...prev, category: e.target.value }))}
                        >
                            <option value="">선택하세요</option>
                            <option value="Java">Java</option>
                            <option value="React">React</option>
                        </Select>
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

                    <Editor onChange={(value) => {
                        setPost((prev) => ({ ...prev, content: value }))
                    }} />

                    <ButtonRow>
                        <OutlineButton type="button" label="임시 저장" />
                        <OutlineButton type="button" label="글 작성" onClick={handleSave} />
                    </ButtonRow>
                </Form>
            </EditorWrapper >
        </>
    );
};

export default Write;

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

const Select = styled.select`    
    width: auto;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;    
`;

const TitleInput = styled.input`
    padding: 10px;
    font-size: 18px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.borderColor};
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