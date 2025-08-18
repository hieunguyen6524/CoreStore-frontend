import { useEffect, useState } from "react";
import type { Category } from "../types/category";
import { getAllCategories } from "../services/categoryService";

function SideBar() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getAllCategories();

      setCategories(res);
    })();
  }, []);

  return (
    <aside className="sidebar">
      <ul className="category-list">
        {categories.length === 0
          ? ""
          : categories.map((category) => (
              <li key={category.slug}>{category.name}</li>
            ))}
      </ul>
    </aside>
  );
}

export default SideBar;
