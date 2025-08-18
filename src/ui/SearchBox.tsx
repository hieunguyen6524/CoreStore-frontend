import { Search } from "lucide-react";

function SearchBox() {
  // const [query, setQuery] = useState("");

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     console.log("Tìm kiếm:", query);
  //   };

  return (
    <div className="header__search">
      <Search className="search__icon" />
      <input
        type="text"
        placeholder="Search for products..."
        className="search__input"
      />
    </div>
  );
}

export default SearchBox;
