import { CircularProgress, Stack, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { addOpacity } from "../../../functions/addOpacity";

export const CanvasDraw = React.forwardRef(({ time }, video) => {
  const ref = useRef();
  const [canvasSize, setcanvasSize] = useState({
    width: 0,
    height: 0,
  });
  const theme = useTheme();

  useEffect(() => {
    try {
      if (!video || !video.current || time === -1 || !ref || !ref.current)
        return;
      video.current.play();
      video.current.currentTime = time;
      (async () => {
        try {
          ref.current.style.opacity = 0;
          const img = await createImageBitmap(video.current);
          setcanvasSize({
            width: img.width,
            height: img.height,
          });
          ref.current.getContext("2d").drawImage(img, 0, 0, 80, 50);
          ref.current.style.opacity = 1
        } catch (error) {}
      })();
    } catch (error) {}
  }, [time, video]);

  return (
    <Stack
      style={{
        width: 50,
        height: 50,
      }}
      bgcolor={addOpacity(theme.palette.primary.dark, 0.6)}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress
        style={{
          width: 25,
          height: 25,
          color: theme.palette.primary.light,
        }}
      />
      <canvas
        {...canvasSize}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        ref={ref}
      />
    </Stack>
  );
});
