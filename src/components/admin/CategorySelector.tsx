import { useEffect, useState } from "react";

import styled from "styled-components";

import { useAppSelector } from "@/store/hooks";

interface Props {
    value: number | null; // 현재 선택된 카테고리
    onChange: (categoryId: number | null) => void;
}

export const CategorySelector: React.FC<Props> = ({ value, onChange }) => {
    const { categories, loading, error } = useAppSelector((state) => state.adminCategory);

    const [parentId, setParentId] = useState<number | null>(null);

    useEffect(() => {
        if (value && categories.length > 0) {
            const parent = categories.find((parent) => {
                return parent.children?.some((child) => child.id === value);
            });
            if (parent) {
                setParentId(parent.id);
            }
        }
    }, [value, categories]);

    if (loading) return <p>로딩 중...</p>;

    if (error) throw new Error(error);

    return (
        <Wrapper>
            <SelectRow>
                <StyledSelect
                    value={parentId !== null ? String(parentId) : ''}
                    onChange={(e) => {
                        const id = Number(e.target.value);
                        setParentId(id);
                        onChange(null);
                    }}
                >
                    <option value="">상위 카테고리 선택</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </StyledSelect>

                {parentId && (
                    <StyledSelect
                        value={value !== null ? String(value) : ''}
                        onChange={(e) => {
                            const id = Number(e.target.value);
                            onChange(id);
                        }}
                    >
                        <option value="">하위 카테고리 선택</option>
                        {categories
                            .find((parent) => parent.id === parentId)
                            ?.children?.map((child) => (
                                <option key={child.id} value={child.id}>
                                    {child.name}
                                </option>
                            ))}
                    </StyledSelect>
                )}
            </SelectRow>

        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const StyledSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;
