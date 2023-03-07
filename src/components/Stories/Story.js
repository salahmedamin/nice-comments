import {
  ArrowBackOutlined,
  CancelPresentationOutlined,
  MoreVertOutlined,
  MusicNoteOutlined,
  Pause,
  PlayArrow,
  ReplyOutlined,
  SlideshowOutlined,
  VisibilityOutlined,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ColorExtractor } from "react-color-extractor";
import { useDrag } from "../../hooks/useDrag";
import { useCustomKeyPress, useSpaceKeyPress } from "../../hooks/useKeyPress";
import { useMediaQuerySizes } from "../../hooks/useMediaQuerySizes";
import { useScreenDimension } from "../../hooks/useScreenDimension";
import { PossibleReactions } from "../Reaction";
import { CustomFab } from "./CustomFab";

export const Story = React.memo(
  ({
    image,
    index, //this story's overall index
    mainIndex, //current main story
    onMainClick,
    duration = 15,
    music: {
      title: musicTitle,
      url: musicURL,
      start: musicStart,
      end: musicEnd,
    } = {},
    location = undefined,
    firstStory = false,
    user: { fName, lName, image: userImage, name: username } = {},
    endOfStoryCb = () => undefined,
    setmain,
    hasMoreLeft,
    hasMoreRight,
    clearMode,
    setclearMode,
    reaction,
    displayMode,
  }) => {
    //current logged in user
    const currentUserName = "amin._.salah";
    //custom hooks
    const [screenWidth, screenHeight] = useScreenDimension();
    //react hooks
    const mainWidth = useMemo(
      () =>
        loading
          ? 500
          : imgRef?.current
          ? imgRef.current.offsetWidth
          : screenWidth < 496
          ? screenWidth
          : 496,
      [screenWidth, imgRef, loading]
    );
    const mainHeight = useMemo(() => 700, []);

    const distanceToMain = useMemo(() => index - mainIndex, [index, mainIndex]);
    const isMain = useMemo(() => distanceToMain === 0, [distanceToMain]);
    const isNextToMain = useMemo(
      () => Math.abs(distanceToMain) === 1,
      [distanceToMain]
    );
    const usedWidth = useMemo(
      () => (isMain ? mainWidth : displayMode === "H" ? 350 : 450),
      [distanceToMain, displayMode]
    );
    const usedHeight = useMemo(
      () => (isMain ? mainHeight : isNextToMain ? "65%" : "50%"),
      [distanceToMain, screenWidth]
    );
    const normalise = useCallback((value) => (value < 100 ? value : 100), []);
    const [circlePercentage, setcirclePercentage] = useState(10);
    const [playing, setplaying] = useState(false);
    const [ownReaction, setownReaction] = useState(reaction);
    const [playedAlready, setplayedAlready] = useState(false); //played at least once
    const hasMusic = useMemo(
      () => musicTitle && musicURL,
      [musicTitle, musicURL]
    );
    const [mediasloading, setmediasloading] = useState({
      img: true,
      audio: true,
    });
    const loading = useMemo(
      () => mediasloading.img || (hasMusic && mediasloading.audio),
      [mediasloading, hasMusic]
    );
    const [muted, setmuted] = useState(false);
    const [interval, setinterval] = useState();
    const [colors, setcolors] = useState([]);
    const normalised = useMemo(
      () => normalise(circlePercentage),
      [circlePercentage]
    );
    const increaseCirclePercentage = useCallback(
      () =>
        circlePercentage < 100
          ? setcirclePercentage((e) => e + 100 / (duration * 10))
          : undefined,
      [circlePercentage, playing]
    );
    const storyRef = useRef(null);
    const imgRef = useRef(null);
    const audioRef = useRef(null);
    //on mute, mute audio
    useEffect(() => {
      if (!hasMusic || !audioRef || !audioRef.current) return;
      audioRef.current.muted = muted;
    }, [audioRef, muted]);
    //on space press, pause or play, toggle
    useSpaceKeyPress(() => {
      if (isMain && !loading) setplaying((e) => !e);
    });
    //on C press, toggle Lazy Mode
    useCustomKeyPress("c", () => {
      if (isMain) {
        setclearMode((e) => !e);
        // ADD SNACKBAR
      }
    });
    //on M press, toggle muted
    useCustomKeyPress("m", () => {
      if (isMain) {
        setmuted((e) => !e);
      }
    });

    //on isMain change, reset bar height
    useEffect(() => {
      if (!isMain) {
        setcirclePercentage(0);
        setplaying(false);
        // setdirty(false)
        if (hasMusic) {
          setmediasloading((e) => ({
            ...e,
            audio: true,
          }));
        }
        return;
      }
      if (!firstStory || playedAlready) setplaying(true);
      if (audioRef && audioRef.current && hasMusic) audioRef.current.play();
    }, [isMain, audioRef]);
    //on pause or play, do it, considering loading
    useEffect(() => {
      if (!playing || !isMain || loading) {
        clearInterval(interval);
        if (hasMusic && audioRef && audioRef.current) {
          audioRef.current.pause();
        }
      } else {
        // setdirty(true)
        setinterval(setInterval(() => increaseCirclePercentage(), 100));
        if (hasMusic && audioRef && audioRef.current) {
          audioRef.current.play();
        }
      }
      return () => {
        clearInterval(interval);
      };
    }, [playing, loading]);
    //on circular progress change
    useEffect(() => {
      if (!isMain) return;
      if (normalised === 100 && isMain) endOfStoryCb();
    }, [normalised]);

    const setalreadyplayed = useCallback(() => setplayedAlready(true), []);
    //if story has audio, attach this mf
    useEffect(() => {
      if (!hasMusic || !audioRef || !audioRef.current) return;
      const audioCopy = audioRef.current;
      audioRef.current.addEventListener("play", setalreadyplayed);
      audioRef.current.currentTime =
        musicStart + (duration * circlePercentage) / 100;
      return () => audioCopy.removeEventListener("play", setalreadyplayed);
    }, [hasMusic, audioRef?.current]);

    const storyFabIconProps = useMemo(
      () => ({
        sx: { width: 20, height: 20 },
        htmlColor: "white",
        // fontSize: "small",
      }),
      []
    );

    const clearModeSmartHiding = useMemo(
      () => ({
        opacity: clearMode ? 0 : 1,
        visibility: clearMode ? "hidden" : "visible",
      }),
      [clearMode]
    );
    const clearModeDefinite = useMemo(
      () => ({
        display: clearMode ? "none" : "flex",
      }),
      [clearMode]
    );
    const { isLG, isMD, isSM, isXS } = useMediaQuerySizes();
    const {
      currentPosition,
      isDragging,
      mouseDragStart,
      toLeft,
      toBottom,
      toRight,
      toTop,
      isBottom,
      isLeft,
      isRight,
      isTop,
    } = useDrag(storyRef);
    // useEffect(() => {
    //   console.log(
    //     `toLeft: ${toLeft}, toBottom: ${toBottom}, toRight: ${toRight}, toTop: ${toTop},isBottom: ${isBottom}, isLeft:${isLeft},isRight: ${isRight},isTop:${isTop}`
    //   );
    // }, [isDragging, currentPosition]);
    const mainStoryClick = useCallback(() => {
      if (typeof onMainClick === "function") onMainClick();
      if (isXS) setplaying((e) => !e);
    }, [isXS, isMain, playing, onMainClick]);
    return (
      <Grid
        onClick={isMain ? undefined : () => setmain(index)}
        style={{
          opacity:
            (Math.abs(distanceToMain) > 2 && displayMode === "H") ||
            (Math.abs(distanceToMain) > 1 && displayMode === "V") ||
            (isXS && !isMain)
              ? 0
              : 1,
          visibility:
            (Math.abs(distanceToMain) > 2 && displayMode === "H") ||
            (Math.abs(distanceToMain) > 1 && displayMode === "V") ||
            (isXS && !isMain)
              ? "hidden"
              : "visible",
          overflow: "hidden",
          minWidth: isMain
            ? isXS
              ? "100%"
              : imgRef.current?.offsetWidth
            : usedWidth,
          maxWidth: isMain
            ? isXS
              ? "100%"
              : imgRef.current?.offsetWidth
            : usedWidth,
          width: isMain
            ? isXS
              ? "100%"
              : imgRef.current?.offsetWidth
            : usedWidth,
          minHeight: isXS ? "100%" : usedHeight,
          height: isXS ? "100%" : usedHeight,
          maxHeight: isXS ? "100%" : usedHeight,
          borderRadius: isXS ? 0 : 10,
          flexGrow: isMain ? 1 : undefined,
          background:
            colors.length === 0
              ? undefined
              : `linear-gradient(to bottom, ${colors
                  .map((c, i) => `${c} ${(300 / colors.length) * i}%`)
                  .join(",")})`,
          cursor: "pointer",
          position: "absolute",
          transform:
            isXS && isMain
              ? undefined
              : `translate(-50%${
                  displayMode === "H" || (displayMode === "V" && isMain)
                    ? ",-50%"
                    : ""
                })`,
          transformOrigin: "left top",
          //if it is main, leave it at mid screen
          // if next to main, relative to main
          left: isDragging && isMain
              ? currentPosition.x - usedWidth / 2 :
              isXS
            ? 0
            : displayMode === "V" || (displayMode === "H" && isMain)
            ? "50%"
            : `calc( 50% + ${
                distanceToMain *
                (isNextToMain ? mainWidth * 0.6 : mainWidth * 0.68)
              }px )`,
          top: isXS
            ? 0
            : displayMode === "H" || (displayMode === "V" && isMain)
            ? "50%"
            : distanceToMain < 0 && !isMain && displayMode === "V"
            ? `-${usedWidth / 2}px`
            : undefined,
          bottom:
            displayMode === "V" && !isMain && distanceToMain > 0
              ? `-${usedWidth / 2}px`
              : undefined,
          transition: `.${isXS ? "05" : "15"}s ease`,
          zIndex: isMain ? 3 : isNextToMain ? 2 : 1,
        }}
        item
      >
        <Box
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: isXS ? 0 : 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            // transition: ".4s ease all"
          }}
        >
          {/* <ColorExtractor getColors={(colors) => setcolors(colors)}> */}
          <img
            style={{
              scale: !isMain || isXS ? 1.5 : undefined,
              width: !isMain || isXS ? "100%" : undefined,
              height: "100%",
              objectFit: !isMain || isXS ? "cover" : undefined,
              // visibility: "hidden"
              // aspectRatio: "4:3",
              transition: ".3s ease all",
            }}
            onLoad={() => {
              setmediasloading((e) => ({
                ...e,
                img: false,
              }));
            }}
            ref={imgRef}
            src={image}
          />
          {/* </ColorExtractor> */}
        </Box>
        {/* ONLY MAIN THINGS HERE */}
        <div
          onClick={mainStoryClick}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 5,
            visibility: isMain ? "visible" : "hidden",
            opacity: isMain ? 1 : 0,
            transition: ".2s ease all",
            background: mediasloading.img ? "rgb(0,0,0)" : undefined,
            boxShadow: loading
              ? "0px 0px 20px 1px rgb(255,255,255,.1)"
              : undefined,
            borderRadius: loading && !isXS ? 10 : undefined,
            overflow: "hidden",
          }}
        >
          {/* AUDIO PLAYER */}
          {isMain && hasMusic ? (
            <audio
              autoPlay={false}
              onSeeked={() => {
                setmediasloading((e) => ({
                  ...e,
                  audio: false,
                }));
              }}
              ref={audioRef}
              src={musicURL}
              // preload="none"
            />
          ) : null}
          {/* A LAYER TO PREVENT DIRECT ACCESS */}
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 1,
              userSelect: "none",
            }}
          />
          {/* BAR HOLDING PROGRESS CIRCLE, MORE OPTIONS, BACK & FORWARD ARROWS */}
          <Stack
            style={{
              position: "absolute",
              zIndex: 2,
              left: 0,
              top: 0,
              width: "calc( 100% - 20px )",
              padding: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              background: clearMode
                ? undefined
                : "linear-gradient(to bottom, rgb(0,0,0,.8) 20%, rgb(0,0,0,.6) 50%, rgb(0,0,0,.3) 75%, transparent)",
            }}
          >
            {/* USER PROFILE */}
            <CustomFab
              absorbEvent={true}
              translateOnHover={false}
              keepBoxShadow={false}
              style={{
                ...clearModeDefinite,
              }}
            >
              <Tooltip
                style={{
                  backgroundColor: "rgb(0,0,0,.77)",
                }}
                title={
                  <Stack direction={"column"}>
                    <Typography fontSize={10}>
                      {`${fName || "Mohamed Amine"} ${lName || "Salah"}`}
                    </Typography>
                    <Typography fontSize={10}>
                      @{username || "amin._.salah"}
                    </Typography>
                  </Stack>
                }
                placement="bottom-start"
                // followCursor
              >
                <Avatar
                  style={{
                    width: 35,
                    height: 35,
                  }}
                  src={
                    userImage ||
                    "https://lastfm.freetls.fastly.net/i/u/ar0/7601902b23500ca99e883543fdfc5cdb"
                  }
                />
              </Tooltip>
            </CustomFab>
            {/* HOLDER OF NEXT, PREV AND PLAY/PAUSE */}
            <CustomFab
              absorbEvent={true}
              style={{
                width: "auto",
                borderRadius: 25,
              }}
              keepBoxShadow={false}
              translateOnHover={false}
            >
              {/* BACK BUTTON */}
              <CustomFab
                keepBoxShadow={false}
                translateOnHover={false}
                style={{
                  background: "transparent",
                }}
                onClick={() =>
                  !hasMoreLeft ? undefined : setmain((e) => e - 1)
                }
              >
                <ArrowBackOutlined
                  {...storyFabIconProps}
                  htmlColor={!hasMoreLeft ? "grey" : "white"}
                />
              </CustomFab>
              {/* PROGRESS CIRCLE */}
              <CustomFab
                translateOnHover={false}
                keepBoxShadow={false}
                style={{
                  width: 35,
                  height: 35,
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                }}
              >
                <CircularProgress
                  size={25}
                  variant={loading ? "indeterminate" : "determinate"}
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
                    visibility: !loading ? "visible" : "hidden",
                  }}
                  onClick={() => setplaying(!playing)}
                >
                  {playing ? (
                    <Pause style={{ fontSize: "14px", color: "white" }} />
                  ) : (
                    <PlayArrow style={{ fontSize: "14px", color: "white" }} />
                  )}
                </Box>
              </CustomFab>
              {/* NEXT BUTTON */}
              <CustomFab
                keepBoxShadow={false}
                translateOnHover={false}
                style={{
                  background: "transparent",
                }}
                onClick={() =>
                  !hasMoreRight ? undefined : setmain((e) => e + 1)
                }
              >
                <ArrowBackOutlined
                  {...storyFabIconProps}
                  htmlColor={!hasMoreRight ? "grey" : "white"}
                  style={{ transform: "rotate(180deg)" }}
                />
              </CustomFab>
            </CustomFab>
            {/* MORE OPTIONS */}
            <CustomFab
              absorbEvent={true}
              keepBoxShadow={false}
              translateOnHover={false}
              style={clearModeDefinite}
            >
              <MoreVertOutlined {...storyFabIconProps} />
            </CustomFab>
          </Stack>
          {/* SIDEBAR HOLDING MUSIC, POSITION AND REPLYING SECTION */}
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            right={10}
            bottom={isXS ? 60 : 10}
            spacing={1}
            style={clearModeSmartHiding}
          >
            {/* MUSIC */}
            {musicTitle && musicURL ? (
              <CustomFab absorbEvent={true}>
                <MusicNoteOutlined
                  {...storyFabIconProps}
                  style={{
                    transition: ".3s ease all",
                    transform: `rotate(${circlePercentage * 14.4}deg)`,
                  }}
                />
              </CustomFab>
            ) : null}
            {currentUserName === username ? (
              <CustomFab absorbEvent={true}>
                <VisibilityOutlined {...storyFabIconProps} />
              </CustomFab>
            ) : (
              <>
                {/* REACTIONS */}
                <CustomFab absorbEvent={true}>
                  <PossibleReactions
                    onEmojiPress={(emoji) => setownReaction(emoji)}
                    useEmojiBg={false}
                    reactions={{
                      own: ownReaction,
                    }}
                    currentEmojiStyle={{
                      width: 18,
                      height: 18,
                    }}
                    emojisStyle={{
                      width: 18,
                      height: 18,
                    }}
                    menuProps={{
                      anchorOrigin: {
                        horizontal: "left",
                        vertical: "top",
                      },
                    }}
                  />
                </CustomFab>
                {/* REPLY */}
                <CustomFab absorbEvent={true}>
                  <ReplyOutlined {...storyFabIconProps} />
                </CustomFab>
              </>
            )}
          </Stack>
          {/* MUTE BUTTON */}
          {!hasMusic ? null : (
            <CustomFab
              absorbEvent={true}
              style={{
                direction: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: 10,
                bottom: isXS ? 60 : 10,
              }}
              translateOnHover={false}
              onClick={() => setmuted((e) => !e)}
            >
              {!muted ? (
                <VolumeUp {...storyFabIconProps} />
              ) : (
                <VolumeOff {...storyFabIconProps} />
              )}
            </CustomFab>
          )}
          {/* CLEAR MODE */}
          <CustomFab
            absorbEvent={true}
            style={{
              direction: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: !hasMusic ? 10 : !clearMode ? "50%" : undefined,
              right: hasMusic && clearMode ? 10 : undefined,
              transform:
                hasMusic && !clearMode ? "translateX(-50%)" : undefined,
              bottom: isXS ? 60 : 10,
            }}
            onClick={() => setclearMode((e) => !e)}
            translateOnHover={false}
          >
            {clearMode ? (
              <Tooltip title="Quit Lazy Mode (Press C)" placement="right">
                <CancelPresentationOutlined {...storyFabIconProps} />
              </Tooltip>
            ) : (
              <Tooltip title="Enter Lazy Mode (Press C)" placement="right">
                <SlideshowOutlined {...storyFabIconProps} />
              </Tooltip>
            )}
          </CustomFab>
        </div>
        {/* NON MAIN THINGS */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backdropFilter: "blur(5px)",
            background: "rgb(0,0,0,.2)",
            position: "absolute",
            zIndex: 3,
            top: 0,
            left: 0,
            visibility: !isMain ? "visible" : "hidden",
            opacity: !isMain ? 1 : 0,
            transition: ".2s ease all",
          }}
          // blurry part when not main
        />
      </Grid>
    );
  }
);
