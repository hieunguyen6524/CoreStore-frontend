import { useEffect, useState } from "react";
import type { Category } from "../types/category";
import { getAllCategories } from "../services/categoryService";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await getAllCategories();

      setCategories(res);
    })();
  }, []);

  function handleNavigate(slug: string, name: string) {
    navigate(`/category/${slug}`, { state: { title: name } });
  }

  return (
    <aside className="sidebar">
      <ul className="category-list">
        {categories.length === 0
          ? ""
          : categories.map((category) => (
              <li
                key={category.slug}
                onClick={() => handleNavigate(category.slug, category.name)}
              >
                {category.name}
              </li>
            ))}
      </ul>
    </aside>
  );
}

export default SideBar;
