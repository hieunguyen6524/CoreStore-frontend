import { useState } from "react";

function TopBanner() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return "";

  return <div>Top banner</div>;
}

export default TopBanner;
