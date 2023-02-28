import Popover from "@mui/material/Popover";
import { useState } from "react";

export default function WithMenu({
  children,
  content,
  anchorOrigin: { vertical: AOV = "bottom", horizontal: AOH = "left" } = {},
  transformOrigin: { vertical: TOV = "top", horizontal: TOH = "right" } = {},
  menuStyle = {},
  style={},
  singleMenuFocus = false,
  direction = "row",
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setopen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setopen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setopen(false);
  };

  const id = open ? "simple-popover" : undefined;

  return (
    <div style={style}>
      {children({
        handleClick,
        setopen,
        open,
      })}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        transformOrigin={{
          horizontal: TOH,
          vertical: TOV,
        }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: AOV,
          horizontal: AOH,
        }}
        PaperProps={{
          style: {
            background: "inherit",
            color: "white",
            padding: 5,
            backgroundColor: "rgba(45,45,45,.6)",
            boxShadow: "0px 0px 25px 2px rgb(0,0,0)",
            backdropFilter: "blur(5px)",
            cursor: "pointer",
          },
        }}
        style={{
          display: "flex",
          flexDirection: direction,
          gap: 3,
          zIndex: "1",
          position: "absolute",
          // right: "100%",
          borderRadius: 10,
          backgroundColor: !singleMenuFocus ? undefined : "rgba(45,45,45,.6)",
          boxShadow: "0px 0px 25px 2px rgb(0,0,0)",
          backdropFilter: singleMenuFocus ? "blur(5px)" : null,
          // transform: "translateX(-10px)",
          ...menuStyle,
        }}
      >
        {typeof content === "function" ? content({ setopen, open }) : content}
      </Popover>
    </div>
  );
}
