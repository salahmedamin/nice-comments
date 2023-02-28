import React, { useState } from "react";

function Hovered({children}) {
  const [hovered, sethovered] = useState(false);
  return (
    <span
      onMouseOver={() => sethovered(true)}
      onMouseOut={() => sethovered(false)}
    >
      {children(hovered)}
    </span>
  );
}

export default Hovered;
