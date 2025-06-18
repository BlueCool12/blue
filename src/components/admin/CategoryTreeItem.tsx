import styles from "./CategoryTree.module.css";
import { useState } from "react";
import {
    MdOutlineChildCare,
    MdOutlineBedroomParent
} from "react-icons/md";
import { Category } from "@/types/category";

interface CategoryTreeItemProps {
    category: Category;
}

export const CategoryTreeItem: React.FC<CategoryTreeItemProps> = ({ category }) => {
    const [open, setOpen] = useState(true);

    const children = category.children ?? [];
    const hasChildren = children.length > 0;

    const isLeaf = !hasChildren;

    return (
        <li className={styles.treeLi}>
            <div
                className={styles.treeItemLabel}
                onClick={() => hasChildren && setOpen(!open)}
            >
                {hasChildren ? (
                    <span className={styles.toggleIcon}>
                        <MdOutlineBedroomParent size={30} />
                    </span>
                ) : (
                    <span className={styles.toggleIcon} />
                )}

                <span className={styles.treeItemText}>
                    {isLeaf && <MdOutlineChildCare size={20} style={{ marginLeft: "4px" }} />}
                    {category.name}
                </span>
            </div>

            {hasChildren && open && (
                <ul className={styles.treeUl}>
                    {children.map((child) => (
                        <CategoryTreeItem key={child.id} category={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};
