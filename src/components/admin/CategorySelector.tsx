import { useState } from "react";

import styled from "styled-components";

import { MdClose } from "react-icons/md";

import { useAppSelector } from "@/store/hooks";

interface Props {
    values: number[]; // 현재 선택된 카테고리들
    onChange: (categoryIds: number[]) => void;
}

export const CategorySelector: React.FC<Props> = ({ values, onChange }) => {
    const { categories, loading } = useAppSelector((state) => state.adminCategory);

    const [parentId, setParentId] = useState<number | null>(null);
    const [childId, setChildId] = useState<number | null>(null);

    const handleAddCategory = (id: number) => {
        if (!values.includes(id)) {
            onChange([...values, id]);
        }
    };

    const handleRemoveCategory = (id: number) => {
        onChange(values.filter((value) => value !== id));
    };

    if (loading) return <p>로딩 중...</p>;

    return (
        <Wrapper>
            <SelectRow>
                <StyledSelect
                    value={parentId ?? ''}
                    onChange={(e) => {
                        const id = Number(e.target.value);
                        setParentId(id);
                        setChildId(null);
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
                        value={childId ?? ''}
                        onChange={(e) => {
                            const id = Number(e.target.value);
                            setChildId(id);
                            handleAddCategory(id);
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

            {values.length > 0 && (
                <SelectedList>
                    {values.map((id) => {
                        const parent = categories.find((parent) =>
                            parent.children?.some((category) => category.id === id)
                        );
                        const child = parent?.children?.find((category) => category.id === id);

                        return (
                            <Tag key={id}>
                                {child?.name ?? 'Unknown'}
                                <RemoveIcon onClick={() => handleRemoveCategory(id)} />
                            </Tag>
                        );
                    })}
                </SelectedList>
            )}
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

const SelectedList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: var(--theme-color-9);
  color: white;
  border-radius: 9999px;
  padding: 4px 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RemoveIcon = styled(MdClose)`
  cursor: pointer;
  font-size: 16px;
`;
