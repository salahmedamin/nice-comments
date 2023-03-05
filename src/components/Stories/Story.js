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
  VolumeUp
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useCustomKeyPress, useSpaceKeyPress } from "../../hooks/useKeyPress";
import { useMediaQuerySizes } from "../../hooks/useMediaQuerySizes";
import { useScreenWidth } from "../../hooks/useScreenWidth";
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
    user: { fName, lName, image: userImage, name: username } = {},
    endOfStoryCb = () => undefined,
    setmain,
    hasMoreLeft,
    hasMoreRight,
    clearMode,
    setclearMode,
    reaction,
  }) => {
    //current logged in user
    const currentUserName = "amin._.salah";
    //custom hooks
    const screenWidth = useScreenWidth();
    //react hooks
    const mainWidth = useMemo(
      () =>
        loading
          ? 460
          : imgRef?.current
          ? imgRef.current.offsetWidth
          : screenWidth < 496
          ? screenWidth
          : 496,
      [screenWidth, imgRef, loading]
    );
    const mainHeight = useMemo(() => 678, []);

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
    const [circlePercentage, setcirclePercentage] = useState(10);
    const [playing, setplaying] = useState(false);
    const [ownReaction, setownReaction] = useState(reaction);
    // const [dirty, setdirty] = useState(false); //played at least once
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
      setplaying(true);
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

    //if story has audio, attach this mf
    useEffect(() => {
      if (!hasMusic || !audioRef || !audioRef.current) return;
      audioRef.current.currentTime = musicStart;
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
        transition: ".3s ease all",
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

    return (
      <Grid
        onClick={isMain ? onMainClick : () => setmain(index)}
        style={{
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
          top: "50%",
          transform: "translateY(-50%)",
          transformOrigin: "left top",
          //if it is main, leave it at mid screen
          // if next to main, midscreen + (distanceToMain*mainWidth) + 60 (spacing)
          left: isXS
            ? 0
            : `${
                (screenWidth -
                  (isMain ? imgRef.current?.offsetWidth : usedWidth)) /
                  2 +
                (isMain
                  ? 0
                  : distanceToMain *
                    (isNextToMain ? mainWidth * 0.6 : mainWidth * 0.73)) +
                "px"
              }`,
          // transformOrigin: "center",
          overflow: !isMain ? "hidden" : undefined,
          transition: `.${isXS ? "05" : "15"}s ease`,
          zIndex: isMain ? 1 : undefined,
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
              width: !isMain || isXS ? "100%" : undefined,
              height: "100%",
              objectFit: !isMain || isXS ? "cover" : undefined,
              // visibility: "hidden"
              // aspectRatio: "4:3",
              // transition: ".4s ease all"
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
              onSeeked={() => {
                setmediasloading((e) => ({
                  ...e,
                  audio: false,
                }));
              }}
              ref={audioRef}
              src={musicURL}
              preload="none"
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
              translateOnHover={false}
              keepBoxShadow={false}
              style={{
                ...clearModeSmartHiding,
                order: clearMode ? 2 : undefined,
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
              style={{
                width: "auto",
                borderRadius: 25,
                order: clearMode ? 1 : undefined,
              }}
              keepBoxShadow={false}
              translateOnHover={false}
            >
              {/* BACK BUTTON */}
              {!hasMoreLeft ? null : (
                <CustomFab
                  keepBoxShadow={false}
                  translateOnHover={false}
                  style={{
                    ...clearModeDefinite,
                    background: "transparent",
                  }}
                  onClick={() =>
                    !hasMoreLeft ? undefined : setmain((e) => e - 1)
                  }
                >
                  <ArrowBackOutlined {...storyFabIconProps} />
                </CustomFab>
              )}
              {/* PROGRESS CIRCLE */}
              <Stack
                style={{
                  width: 35,
                  height: 35,
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
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
              </Stack>
              {/* NEXT BUTTON */}
              {!hasMoreRight ? null : (
                <CustomFab
                  keepBoxShadow={false}
                  translateOnHover={false}
                  style={{
                    ...clearModeDefinite,
                    background: "transparent",
                  }}
                  onClick={() =>
                    !hasMoreRight ? undefined : setmain((e) => e + 1)
                  }
                >
                  <ArrowBackOutlined
                    {...storyFabIconProps}
                    style={{ transform: "rotate(180deg)" }}
                  />
                </CustomFab>
              )}
            </CustomFab>
            {/* MORE OPTIONS */}
            <CustomFab
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
            bottom={10}
            spacing={1}
            style={clearModeSmartHiding}
          >
            {/* MUSIC */}
            {musicTitle && musicURL ? (
              <CustomFab>
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
              <CustomFab>
                <VisibilityOutlined {...storyFabIconProps} />
              </CustomFab>
            ) : (
              <>
                {/* REACTIONS */}
                <CustomFab>
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
                <CustomFab>
                  <ReplyOutlined {...storyFabIconProps} />
                </CustomFab>
              </>
            )}
          </Stack>
          {/* MUTE BUTTON */}
          {!hasMusic ? null : (
            <CustomFab
              style={{
                direction: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: 10,
                bottom: 10,
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
            style={{
              direction: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: !hasMusic ? 10 : "50%",
              transform: !hasMusic ? undefined : "translateX(-50%)",
              bottom: 10,
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
