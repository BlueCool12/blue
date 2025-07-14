'use client';

import styles from "./page.module.css";

import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { fetchCategories } from "@/store/admin/categorySlice";

import { AddCategoryModal } from "@/components/admin/AddCategoryModal";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { CategoryTree } from "@/components/admin/CategoryTree";

export default function CategoriesPage() {
    const dispatch = useAppDispatch();
    const { categories, loading } = useAppSelector((state) => state.adminCategory);

    const [showCategoryModal, setShowCategoryModal] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>카테고리 목록</h1>

            <button className={styles.addButton} onClick={() => setShowCategoryModal(true)}>카테고리 추가</button>

            {loading && <LoadingSpinner />}
            {categories.length > 0 && <CategoryTree categories={categories} />}

            {showCategoryModal && (
                <AddCategoryModal
                    onClose={() => setShowCategoryModal(false)}
                    onSuccess={() => {
                        alert("~ 등록 성공 ~")
                        dispatch(fetchCategories());
                    }}
                    categories={categories}
                />
            )}
        </div>
    );
};