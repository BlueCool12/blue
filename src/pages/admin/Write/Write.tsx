import styled from "styled-components";
import { Editor } from "../../../components/admin/Editor";
import { OutlineButton } from '../../../components/common/OutlineButton';
import { useState } from "react";

export const Write = () => {

    const [post, setPost] = useState({
        title: '',
        content: '',
        category: '',
    });

    const handleSave = () => {
        console.log(post.category);
        console.log(post.title);
        console.log(post.content);
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
                            <option value="기술">기술</option>
                            <option value="일상">일상</option>
                        </Select>
                        <TitleInput
                            value={post.title}
                            onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
                        />
                    </CategoryRow>

                    <Editor onChange={(value) => setPost((prev) => ({ ...prev, content: value }))} />

                    <ButtonRow>
                        <OutlineButton type="button" label="임시 저장" />
                        <OutlineButton type="button" label="글 작성" onClick={handleSave} />
                    </ButtonRow>
                </Form>
            </EditorWrapper >
        </>
    );
};

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
    gap: 4px;
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

const ButtonRow = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;