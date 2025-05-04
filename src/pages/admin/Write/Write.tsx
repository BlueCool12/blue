import styled from "styled-components";
import Editor from "../../../components/admin/editor/Editor";
import { OutlineButton } from '../../../components/common/OutlineButton';

export const Write = () => {

    return (
        <>
            <EditorWrapper>
                <Form>
                    <CategoryRow>
                        <Select>
                            <option>선택하세요</option>
                            <option>기술</option>
                            <option>일상</option>
                        </Select>
                    </CategoryRow>

                    <Editor />

                    <ButtonRow>                        
                        <OutlineButton type="button" label="임시 저장"></OutlineButton>
                        <OutlineButton type="button" label="글 작성"></OutlineButton>
                    </ButtonRow>
                </Form>
            </EditorWrapper>
        </>
    );
};

const EditorWrapper = styled.div`
    display: flex;
    justify-content: center;    
    padding: 40px 24px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;    
`;

const Form = styled.div`        
    width: 100%;    
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const CategoryRow = styled.div`
    display: flex;
    flex-direction: column;    
`;

const Select = styled.select`    
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
`;

const ButtonRow = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;