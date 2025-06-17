import styles from "./CategoryTree.module.css";
import { Category } from "@/types/category";
import { CategoryTreeItem } from "./CategoryTreeItem";

interface CategoryTreeProps {
    categories: Category[];
}

export const CategoryTree: React.FC<CategoryTreeProps> = ({ categories }) => {
    return (
        <ul className={styles.treeUl}>
            {categories.map((cat) => (
                <CategoryTreeItem key={cat.id} category={cat} />
            ))}
        </ul>
    );
};
