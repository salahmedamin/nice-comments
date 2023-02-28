import { useTheme } from "@mui/material";
import { useRef } from "react";

export default function Timing({ timing, duration }) {
  const theme = useTheme();
  const parentRef = useRef(null);
  const childRef1 = useRef(null);
  const childRef2 = useRef(null);
  return (
    <div
      style={{
        color: theme.palette.primary.light,
        fontSize: 11,
        fontWeight: "bold",
        display: "flex",
        transition: ".3s ease all",
        overflow: "hidden",
        maxWidth: (childRef1 && childRef1.current ) ? childRef1.current.getBoundingClientRect().width+"px" : undefined
      }}
      onMouseOver={(e) => {
        console.log(parentRef)
        if (!(childRef1 && childRef2 && childRef1.current && childRef2.current)) return;
          parentRef.current.style.maxWidth =
            (childRef1.current.getBoundingClientRect().width + childRef2.current.getBoundingClientRect().width)+"px"
      }}
      onMouseOut={(e) => {
        if (!(childRef1 && childRef1.current )) return;
        parentRef.current.style.maxWidth =
            childRef1.current.getBoundingClientRect().width+"px"
      }}
      ref={parentRef}
    >
      <span ref={childRef1}>
        {timing.hours > 0 ? timing.hours + ":" : null}
        {timing.minutes + ":" + timing.seconds}
      </span>
      <span ref={childRef2}>
        /{duration.hours > 0 ? duration.hours + ":" : null}
        {duration.minutes + ":" + duration.seconds}
      </span>
    </div>
  );
}
