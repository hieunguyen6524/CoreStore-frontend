import { memo } from "react";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10rem 0",
      }}
    >
      <div className="loader"></div>
    </div>
  );
}

export default memo(Loading);
