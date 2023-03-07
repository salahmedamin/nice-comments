import { Box } from "@mui/material";
import { useRef } from "react";
import { useHover } from "usehooks-ts";

export const CustomFab = ({
  children,
  style,
  hoverStyle,
  translateOnHover = true,
  keepBoxShadow = true,
  absorbEvent = false,
  ...props
}) => {
  const fabRef = useRef(null);
  const hovered = useHover(fabRef);
  // const absorbE = useCallback((e) => e.stopPropagation(), []);

  // useEffect(() => {
  //   if(!fabRef?.current || !absorbEvent) return
  //   const copy = fabRef.current;
  //   fabRef.current.addEventListener("click", absorbE)
  //   return () => {
  //     copy.removeEventListener("click", absorbE);
  //   };
  // }, []);
  return (
    <Box
      // size={"small"}
      ref={fabRef}
      sx={{
        boxShadow: !keepBoxShadow
          ? undefined
          : "0px 0px 5px .5px rgb(0,0,0,.8)",
        background: "rgb(0,0,0,.5)",
        width: 35,
        height: 35,
        zIndex: 2,
        transition: ".3s ease all",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateX(${hovered && translateOnHover ? -5 : 0}px)`,
        borderRadius: "50%",
        ...style,
        "&:hover": {
          background: "rgb(0,0,0,.77)",
          ...hoverStyle,
        },
      }}
      {...props}
    >
      {typeof children === "function" ? children({ hovered }) : children}
    </Box>
  );
};
