'use client';

import styled from "styled-components";

import { useState } from "react";

import { categoryApi } from "@/lib/api/admin/categoryApi";

import { Category } from "@/types/category";

import { MdOutlineClose } from 'react-icons/md';


interface AddCategoryModalProps {
    onClose: () => void;
    onSuccess: () => void;
    categories: Category[];
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose, onSuccess, categories }) => {
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState<number | null>(null);

    const handleSubmit = async () => {
        if (!name.trim()) return alert("카테고리 이름을 입력하세요.");
        await categoryApi.createCategory({ name, parentId });
        onSuccess();
        onClose();
    };

    return (
        <Backdrop>
            <ModalContainer>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <Title>카테고리 추가</Title>
                    <MdOutlineClose cursor={"pointer"} type="button" size={'20px'} onClick={onClose} />
                </div>

                <Input
                    type="text"
                    placeholder="카테고리 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Select
                    value={parentId ?? ""}
                    onChange={(e) => setParentId(e.target.value ? Number(e.target.value) : null)}
                >
                    <option value="">루트 카테고리</option>
                    {categories
                        .filter(cat => cat.parentId === null)
                        .map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                </Select>

                <Button type="button" onClick={handleSubmit}>등록</Button>

            </ModalContainer>
        </Backdrop>
    );
}

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    position: relative;
    z-index: 1001;
    background: var(--card-bg);    
    padding: 2rem;
    border-radius: 12px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`    
    font-size: 1.25rem;
    font-weight: 600;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
`;

const Select = styled.select`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
`;

const Button = styled.button`
    width: 100%;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    background: var(--btn-bg);
    color: var(--btn-color);
    cursor: pointer;

    &:hover {
        background: var(--btn-hover-color);        
    }
`;