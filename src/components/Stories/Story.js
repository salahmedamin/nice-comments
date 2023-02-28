import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useScreenWidth } from "../../hooks/useScreenWidth";

export const Story = ({
  image,
  index, //this story's overall index
  mainIndex, //current main story
  onMainClick,
  duration = 15,
  endOfStoryCb = () => undefined,
}) => {
  const screenWidth = useScreenWidth();
  const mainWidth = useMemo(
    () => (screenWidth < 496 ? screenWidth : 496),
    [screenWidth]
  );
  const mainHeight = useMemo(() => "95%", []);

  const distanceToMain = useMemo(() => index - mainIndex, [index, mainIndex]);
  const isMain = useMemo(() => distanceToMain === 0, [distanceToMain]);
  const isNextToMain = useMemo(
    () => Math.abs(distanceToMain) === 1,
    [distanceToMain]
  );
  const usedWidth = useMemo(
    () => (isMain ? mainWidth : 350),
    [distanceToMain]
  );
  const usedHeight = useMemo(
    () => (isMain ? mainHeight : isNextToMain ? "67%" : "50%"),
    [distanceToMain, screenWidth]
  );
  const normalise = useCallback((value) => (value < 100 ? value : 100), []);
  const [barHeight, setbarHeight] = useState(10);
  const [playing, setplaying] = useState(true);
  const [interval, setinterval] = useState();
  const normalised = useMemo(() => normalise(barHeight), [barHeight]);
  const increaseBarHeight = useCallback(
    () =>
      barHeight < 100
        ? setbarHeight((e) => e + 100 / (duration * 10))
        : undefined,
    [barHeight, playing]
  );
  const imgRef = useRef(null)
  //on img load detect img main colors
//   useEffect(() => {
//     if(!imgRef || !imgRef.current || !imgRef.current.complete) return;
//     imgRef.current.setAttribute('crossOrigin', '');
//     console.log(getAverageRGB(imgRef.current))
//   }, [imgRef?.current?.complete]);
  //on isMain change, reset bar height
  useEffect(() => {
    if (!isMain) {
      setbarHeight(0);
      setplaying(false);
      return;
    }
    setplaying(true);
  }, [isMain]);
  //on pause or play, do it
  useEffect(() => {
    if (!playing || !isMain) clearInterval(interval);
    else setinterval(setInterval(() => increaseBarHeight(), 100));
    return () => {
      clearInterval(interval);
    };
  }, [playing]);
  //on circular progress change
  useEffect(() => {
    if (!isMain) return;
    if (normalised === 100 && isMain) endOfStoryCb();
  }, [normalised]);
  return (
    <Box
      onClick={isMain ? onMainClick : () => undefined}
      style={{
        minWidth: usedWidth,
        maxWidth: usedWidth,
        width: usedWidth,
        minHeight: usedHeight,
        height: usedHeight,
        maxHeight: usedHeight,
        borderRadius: 10,
        flexGrow: isMain ? 1 : undefined,
        background: "transparent",
        cursor: "pointer",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        //if it is main, leave it at mid screen
        // if next to main, midscreen + (distanceToMain*mainWidth) + 60 (spacing)
        left: `${
          (screenWidth - usedWidth) / 2 +
          (isMain
            ? 0
            : distanceToMain *
              (isNextToMain ? mainWidth * 0.6 : mainWidth * 0.73)) +
          "px"
        }`,
        overflow: !isMain ? "hidden" : undefined,
        transition: ".5s ease all",
        zIndex: isMain ? 1 : undefined,
      }}
    >
      {/* BLURRY PART WHEN NOT MAIN */}
      {!isMain ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            backdropFilter: "blur(5px)",
            background: "rgb(0,0,0,.2)",
            position: "absolute",
            zIndex: 1,
          }}
        />
      ) : undefined}
      {/* A LAYER TO PREVENT DIRECT ACCESS */}
      {!isMain ? null : (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 1,
            userSelect: "none",
          }}
        />
      )}
      <Box
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 10,
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            aspectRatio: "9:16"
          }}
          ref={imgRef}
          src={image}
        />
      </Box>
      {isMain ? (
        <Box
          sx={{
            position: "absolute",
            zIndex: 2,
            right: 10,
            top: 10,
            display: "inline-flex",
          }}
        >
          <CircularProgress
            size={30}
            variant="determinate"
            value={normalised}
            style={{
              color: "white",
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setplaying(!playing)}
          >
            {playing ? (
              <Pause fontSize="10px" style={{ color: "white" }} />
            ) : (
              <PlayArrow fontSize="10px" style={{ color: "white" }} />
            )}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};
