import { Search } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  // const [query, setQuery] = useState("");

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     console.log("Tìm kiếm:", query);
  //   };
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!keyword.trim()) {
      toast.error("Vui lòng nhập từ khóa");
      return navigate("/");
    }
    if (keyword.length < 3) {
      toast.error("Nhập ít nhất 2 ký tự");
      return;
    }
    navigate(`/products?keyword=${encodeURIComponent(keyword)}`);
  }

  return (
    <form className="header__search" onSubmit={handleSearch}>
      <Search className="search__icon" onClick={handleSearch} />
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        className="search__input"
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
}

export default SearchBox;
