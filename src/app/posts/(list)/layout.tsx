import styles from '@/app/posts/(list)/page.module.css';
import MobileCategorySelect from "@/components/categories/MobileCategorySelect";
import { CategorySidebar } from "@/components/categories/CategorySidebar";

import { categoryService } from "@/services/categoryService";

export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await categoryService.getCategories();

  return (
    <>
      <div className={styles['posts--mobile']}>
        <MobileCategorySelect categories={categories} />
      </div>

      <CategorySidebar categories={categories} />

      {children}
    </>
  )
}