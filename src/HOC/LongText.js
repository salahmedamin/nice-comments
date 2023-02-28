import { Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
export const LongText = React.memo(({ children, style={} }) => {
  const [isLong, setisLong] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref || !ref.current) return;
    if (ref.current.getBoundingClientRect().height > 80) setisLong(true);
  }, [ref]);
  return (
    <Stack
      direction="column"
      paddingLeft={"6px"}
      borderLeft="1px solid rgba(217,217,217,.3)"
      marginTop={1}
      width={"fit-content"}
      style={style}
    >
      {children({
        showMore,
        setShowMore,
        isLong,
        ref,
      })}

      {isLong ? (
        <Typography
          onClick={() => {
            setShowMore(!showMore);
          }}
          sx={{
            textDecoration: "underline",
            width: "fit-content",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Show {showMore ? "Less" : "More"}
        </Typography>
      ) : null}
    </Stack>
  );
});
