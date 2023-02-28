import { useTheme } from "@mui/material";
import React, { /*useEffect,*/ useRef, useState } from "react";
import { getTimeFromSeconds } from "../../../functions/getTimeFromSeconds";
import { CanvasDraw } from "./CanvasDraw";

export default React.forwardRef(
  ({ duration, onClick, timing, setCanvasTime, canvasTime }, videoRef) => {
    // const canvasRef = useRef()
    const rangePlayer = useRef(null);
    const [hoverplayrange, sethoverplayrange] = useState(false);
    const [showPlayRangeTime, setshowPlayRangeTime] = useState(false);
    const [timeFromPlayRange, settimeFromPlayRange] = useState({
      timing: getTimeFromSeconds(0),
      percentage: 0,
    });

    const theme = useTheme();
    return (
      <div
        style={{
          flexGrow: 1,
          height: !hoverplayrange ? 8 : 12,
          transition: ".1s ease all",
          cursor: "pointer",
          borderRadius: 5,
          position: "relative",
        }}
        ref={rangePlayer}
        onMouseMove={(e) => {
          const domrect = rangePlayer.current?.getBoundingClientRect();
          if (!domrect) return;
          const { x, width } = domrect;
          const inRangeWidth = e.clientX - x;
          const percentage = (inRangeWidth * 100) / width;
          const timing = getTimeFromSeconds((percentage * duration.raw) / 100);
          if(timing.raw < 0) return;
          settimeFromPlayRange({
            timing,
            percentage: inRangeWidth - 18,
          });
          sethoverplayrange(true);
          setshowPlayRangeTime(true);
          setCanvasTime(timing.raw);
        }}
        onMouseOut={() => {
          sethoverplayrange(false);
          setshowPlayRangeTime(false);
          setCanvasTime(-1);
        }}
        onClick={() => onClick(timeFromPlayRange.timing.raw)}
      >
        <div
          style={{
            width: "100%",
            height: 2,
            background: theme.palette.primary.light,
            position: "absolute",
            top: "50%",
            borderRadius: 5,
            transform: "translateY(-50%)",
          }}
        />
        {showPlayRangeTime ? (
          <div
            style={{
              padding: 5,
              background: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              position: "absolute",
              bottom: `calc( 100% + 5px )`,
              left: timeFromPlayRange.percentage,
              fontSize: 11,
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ textAlign: "center", position: "relative" }}>
              {!!videoRef && !!videoRef.current ? (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc( 100% + 10px )",
                    borderRadius: 8,
                    overflow: "hidden",
                    // zIndex: 3,
                    maxWidth: 80,
                    maxHeight: 50,
                    left: "50%",
                    transform: "translateX(-50%)"
                  }}
                >
                  <CanvasDraw time={canvasTime} ref={videoRef} />{" "}
                </div>
              ) : null}
              {timeFromPlayRange.timing.hours > 0
                ? timeFromPlayRange.timing.hours + ":"
                : null}
              {timeFromPlayRange.timing.minutes +
                ":" +
                timeFromPlayRange.timing.seconds}
            </div>
          </div>
        ) : null}
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            transition: ".4s ease all",
            backgroundColor: "white",
            height: "50%",
            width: (timing.raw * 100) / duration?.raw + "%" || 0,
            borderRadius: 5,
          }}
        />
      </div>
    );
  }
);
