import { useEffect, useState, memo, useCallback, useMemo } from "react";
import type { Category } from "../types/category";
import { getAllCategories } from "../services/categoryService";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function SideBar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await getAllCategories();

      setCategories(res);
    })();
  }, []);

  const handleNavigate = useCallback((slug: string, name: string) => {
    navigate(`/category/${slug}`, { state: { title: name } });
  }, [navigate]);

  const categoryList = useMemo(() => 
    categories.map((category) => (
      <li
        key={category.slug}
        onClick={() => handleNavigate(category.slug, category.name)}
      >
        {category.name}
      </li>
    )),
    [categories, handleNavigate]
  );

  return (
    <aside className="sidebar">
      <ul className="category-list">
        {categories.length === 0 ? (
          <Loading />
        ) : (
          categoryList
        )}
      </ul>
    </aside>
  );
}

export default memo(SideBar);
