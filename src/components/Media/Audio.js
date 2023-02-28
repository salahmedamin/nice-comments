import { PauseOutlined, PlayArrowOutlined } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { addOpacity } from "../../functions/addOpacity";
import { getTimeFromSeconds } from "../../functions/getTimeFromSeconds";
import { Loading } from "./Video/Loading";

export const MediaAudio = (props) => {
  const theme = useTheme();
  const [audio, setmedia] = useState({
    ...props,
    loading: false,
    playing: false,
    timing: getTimeFromSeconds(0),
    playedOnce: false,
  });
  const [duration, setduration] = useState({});
  const [playerWidth, setplayerWidth] = useState(0);
  const ref = useRef(null);
  // const [audio, setaudio] = useMedia({
  //   id: props.id
  // })

  //useEffex

  useEffect(() => {
    if (props.stop) {
      pause();
      ref.current?.pause();
    }
  }, [props.stop]);

  const setloading = useCallback(
    (v) => setmedia((e) => ({ ...e, loading: v })),
    [ref]
  );
  const play = useCallback(() => {
    setmedia((e) => ({
      ...e,
      playedOnce: true,
      playing: true,
      loading: false,
    }));
  }, [ref]);
  const pause = useCallback(() => {
    setmedia((e) => ({
      ...e,
      playing: false,
    }));
  }, [ref]);
  const updateTime = useCallback(() => {
    setmedia((e) => ({
      ...e,
      timing: getTimeFromSeconds(ref?.current?.currentTime || audio.timing.raw),
    }));
  }, [ref?.current?.currentTime]);
  useEffect(() => {
    if (!ref || !ref.current) return;
    const onLoadedData = () => {
      setloading(Number(ref?.current?.readyState) < 3);
      if (!!ref.current && audio.timing)
        ref.current.currentTime = audio.timing.raw;
    };
    const onSeeking = () => {
      if (!ref || !ref.current) return;
      setloading(true);
    };
    const onSeeked = () => {
      if (!ref || !ref.current) return;
      setloading(false);
      if (audio.playedOnce) ref.current.play();
    };
    //first load
    ref.current.addEventListener("loadeddata", onLoadedData);
    ref.current.addEventListener("seeking", onSeeking);
    ref.current.addEventListener("seeked", onSeeked);

    const refCopy = ref.current;
    ref.current.addEventListener("play", play);
    ref.current.addEventListener("pause", pause);

    //time update
    ref.current.addEventListener("timeupdate", updateTime);

    return () => {
      refCopy.removeEventListener("timeupdate", updateTime);
      refCopy.removeEventListener("play", play);
      refCopy.removeEventListener("pause", pause);
      refCopy.removeEventListener("loadeddata", onLoadedData);
    };
  }, [ref, audio.loading, duration]);
  useEffect(() => {
    if (
      !ref ||
      !ref.current ||
      Object.keys(duration).length > 0 ||
      isNaN(ref.current.duration)
    )
      return;
    setduration(getTimeFromSeconds(ref.current.duration));
  }, [audio]);

  useEffect(() => {
    if (!audio.timing || !audio.playedOnce) return;
    setplayerWidth((audio.timing.raw / duration.raw) * 100);
  }, [audio.timing]);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "70%",
          height: props.audioHeight || 50,
          borderRadius: 10,
          //   border: `2px solid ${theme.palette.primary.contrastText}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: 2,
          paddingY: "none",
          zIndex: 1,
          position: "relative",
          overflow: "hidden",
          //   background: theme.palette.primary.main,
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          const domrect = e.currentTarget.getBoundingClientRect();
          if (!domrect || !audio.playedOnce) return;
          const { x, width } = domrect;
          const inRangeWidth = e.clientX - x;
          const percentage = (inRangeWidth * 100) / width;
          const newTime = (percentage * duration.raw) / 100;
          if (ref.current) ref.current.currentTime = newTime;
        }}
      >
        <Box
          sx={{
            width: playerWidth + "%",
            height: 1,
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
            background: "#528AAE",
            transition: ".4s ease all",
          }}
        ></Box>
        {ref.current && ref.current.buffered.length > 0
          ? Array.from(Array(ref.current.buffered.length).keys()).map(
              (e, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      width:
                        (Number(ref.current?.buffered.end(e)) -
                          Number(ref.current?.buffered.start(e)) /
                            duration.raw) *
                          100 +
                        "%",
                      height: 1,
                      position: "absolute",
                      zIndex: -2,
                      top: 0,
                      left:
                        (Number(ref.current?.buffered.start(e)) /
                          duration.raw) *
                          100 +
                        "%",
                      background: addOpacity(theme.palette.info.light, 0.1),
                      transition: ".4s ease all",
                    }}
                  />
                );
              }
            )
          : null}
        <Box
          style={{
            height: 35,
            width: 35,
            borderRadius: "50%",
            // border: `2px solid ${addOpacity(
            //   theme.palette.primary.contrastText,
            //   0.8
            // )}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (audio.loading || !ref.current) return;
            ref.current[audio.playing ? "pause" : "play"]();
          }}
        >
          {audio.loading ? (
            <Loading
              color={addOpacity(theme.palette.primary.contrastText, 0.8)}
              size={15}
            />
          ) : audio.playing ? (
            <PauseOutlined
              style={{
                color: addOpacity(theme.palette.primary.contrastText, 0.8),
              }}
            />
          ) : (
            <PlayArrowOutlined
              style={{
                color: addOpacity(theme.palette.primary.contrastText, 0.8),
              }}
            />
          )}
        </Box>
        <Box
          style={{
            borderRadius: 5,
            background: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            fontSize: 11,
            padding: 6,
            zIndex: 1,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {!audio.timing
            ? "00"
            : audio.timing.hours > 0
            ? audio.timing.hours + ":"
            : null}
          {!audio.timing
            ? "00"
            : audio.timing.minutes + ":" + audio.timing.seconds}
          {Object.keys(duration).length === 0
            ? null
            : `/${duration.hours > 0 ? duration.hours + ":" : ""}
          ${duration.minutes + ":" + duration.seconds}`}
        </Box>
      </Box>
      <audio
        controls
        src={props.unique}
        style={{
          display: "none",
        }}
        // preload={"none"}
        ref={ref}
      />
    </Box>
  );
};
