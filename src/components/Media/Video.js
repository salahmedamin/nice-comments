import { PlayArrowOutlined, VideocamOutlined } from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { addOpacity } from "../../functions/addOpacity";
import { getTimeFromSeconds } from "../../functions/getTimeFromSeconds";
import { Loading } from "./Video/Loading";
import PlayRange from "./Video/PlayRange";
import Quality from "./Video/Quality";
import SpeedUp from "./Video/SpeedUp";
import SwitchPlay from "./Video/SwitchPlay";
import Timing from "./Video/Timing";
import Volume from "./Video/Volume";

export const MediaVideo = (props) => {
  const {
    duration = 0,
    video_qualities = [],
    id,
    width = "100%",
    stop,
    isSingle = false,
  } = props;
  const [video, setmedia] = useState({
    ...props,
    loading: false,
    playing: false,
    timing: getTimeFromSeconds(0),
    playedOnce: false,
    current: 0,
    volume: 0,
    currentTime: 0,
  });

  const [_duration, set_duration] = useState({});
  const [showplayrange, setshowplayrange] = useState(false);
  const [showQualities, setshowQualities] = useState(false);
  const ref = useRef(null);
  const tempVideoRef = useRef(null);
  const [tempCanvasTime, settempCanvasTime] = useState(-1);

  const play = useCallback(() => {
    setmedia((e) => ({
      ...e,
      playedOnce: true,
      playing: true,
      loading: false,
      ended: false,
    }));
  }, [ref]);
  const pause = useCallback(() => {
    setmedia((e) => ({
      ...e,
      playing: false,
      ended: false,
    }));
  }, [ref]);
  const setLoadingNow = useCallback(() => {
    pause();
    setmedia((e) => ({
      ...e,
      loading: true,
    }));
  }, [ref]);
  const updateTime = useCallback(() => {
    setmedia((e) => ({
      ...e,
      timing: getTimeFromSeconds(
        ref?.current?.currentTime || video.currentTime
      ),
    }));
  }, [video.currentTime]);

  useEffect(() => {
    if (!ref.current) return;
    if (!video.playing || video.loading) ref.current.pause();
    else ref.current.play();
  }, [video.playing]);

  useEffect(() => {
    if (stop) {
      pause();
    }
  }, [stop]);

  useEffect(() => {
    if (!ref || !ref.current) return;
    const onEnded = () => {
      setmedia((e) => ({ ...e, ended: true, playing: false }));
    };
    const onLoadedData = () => {
      if (Number(ref?.current?.readyState) < 3) setLoadingNow();
      if (Object.keys(_duration).length === 0)
        set_duration(getTimeFromSeconds(ref.current.duration));
      if (!!ref.current)
        setmedia((e) => ({ ...e, currentTime: video.currentTime }));
      if (video.playedOnce) play();
    };
    const onSeeking = () => {
      if (!ref || !ref.current) return;
      setLoadingNow();
    };
    const onSeeked = () => {
      if (video.playedOnce) play();
    };
    //first load
    ref.current.addEventListener("loadeddata", onLoadedData);
    ref.current.addEventListener("seeking", onSeeking);
    ref.current.addEventListener("seeked", onSeeked);

    //play/pause
    ref.current.addEventListener("play", play);
    ref.current.addEventListener("pause", pause);

    //time update
    ref.current.addEventListener("timeupdate", updateTime);

    //ended
    ref.current.addEventListener("ended", onEnded);

    const refCopy = ref.current;

    return () => {
      refCopy.removeEventListener("timeupdate", updateTime);
      refCopy.removeEventListener("play", play);
      refCopy.removeEventListener("pause", pause);
      refCopy.removeEventListener("loadeddata", onLoadedData);
      refCopy.removeEventListener("ended", onEnded);
    };
  }, [ref, video.loading, duration]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = video.currentTime;
    }
  }, [video.currentTime]);

  useEffect(() => {
    //changing video quality
    let referred = ref.current;
    if (!referred) return;
    setLoadingNow();
    if (ref.current) ref.current.load();
    return () => {
      referred = null;
    };
  }, [video.current]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = video.volume / 100;
    }
  }, [video.volume]);

  const theme = useTheme();

  return (
    <>
      <div
        style={{
          height: "100%",
          maxHeight: 500,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: 5,
        }}
        onMouseOver={() =>
          video.loading || !video.playedOnce
            ? undefined
            : setshowplayrange(true)
        }
        onMouseOut={() =>
          video.loading || !video.playedOnce
            ? undefined
            : setshowplayrange(false)
        }
      >
        {!video.playedOnce ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              zIndex: 10,
              bgcolor: addOpacity(theme.palette.primary.dark, 0.8),
              backdropFilter: "blur(1px)",
              position: "absolute",
              left: 0,
              top: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              if (ref.current) ref.current?.play();
            }}
          >
            <IconButton
              style={{
                position: "absolute",
                top: 5,
                right: 20,
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <VideocamOutlined
                style={{
                  color: theme.palette.primary.light,
                }}
              />
            </IconButton>
            <IconButton>
              <PlayArrowOutlined
                style={{
                  color: theme.palette.primary.light,
                }}
              />
            </IconButton>
          </Box>
        ) : null}
        {!video.playedOnce || !video.loading ? null : (
          <Loading
            color={theme.palette.primary.light}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "100%",
              height: "100%",
              zIndex: 5,
              borderRadius: "50%",
              alignItems: "center",
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width,
            // height: isSingle ? undefined : height || 450,
            backgroundColor: theme.palette.primary.dark,
          }}
        >
          <div
            style={{
              width: "100%",
              // height: isSingle ? ref?.current?.videoHeight : height || 450,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                position: "absolute",
                zIndex: 2,
                cursor: "pointer",
              }}
              onClick={() =>
                !!ref.current && !video.loading
                  ? video.playing
                    ? pause()
                    : play()
                  : null
              }
            >
              <SpeedUp
                style={{ left: 0 }}
                onDblClick={
                  video.loading
                    ? () => undefined
                    : () =>
                        video.timing.raw - 10 > 0 && !!ref.current
                          ? setmedia((e) => ({
                              ...e,
                              currentTime: video.timing.raw - 10,
                            }))
                          : null
                }
              />
              <SpeedUp
                style={{ right: 0 }}
                onDblClick={() =>
                  video.timing.raw + 10 <= _duration.raw && !!ref.current
                    ? setmedia((e) => ({ ...e, currentTime: video.timing.raw + 10 }))
                    : null
                }
              />
            </div>
            <video
              ref={ref}
              style={{
                width: window.innerWidth < 690 ? "100%" : undefined,
                height: "100%",
                maxWidth: "100%",
                maxHeight: 500,
              }}
              preload="none"
            >
              <source src={video_qualities[video.current].url} />
            </video>
            <video
              ref={tempVideoRef}
              style={{
                display: "none",
              }}
              preload="none"
            >
              <source src={video_qualities[video.current].url} />
            </video>
            <div
              className="hidescrollbar"
              style={{
                position: "absolute",
                top:
                  showplayrange || showQualities
                    ? `calc( 100% - 33px )`
                    : "calc( 100% - 0px )",
                transition: ".3s ease all",
                width: "100%",
                height: "33px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                zIndex: 3,
                maxWidth: "100%",
                gap: 10,
                background: addOpacity(theme.palette.primary.dark, 0.7),
              }}
            >
              <SwitchPlay
                pause={video.loading ? () => undefined : () => pause()}
                play={video.loading ? () => undefined : () => play()}
                playing={video.playing}
                loading={video.loading}
                ended={video.ended}
              />
              {Object.keys(_duration).length === 0 ? (
                "00:00"
              ) : (
                <Timing duration={_duration} timing={video.timing} />
              )}
              <PlayRange
                duration={_duration}
                onClick={
                  video.loading
                    ? () => undefined
                    : (a) => setmedia((e) => ({ ...e, currentTime: a }))
                }
                timing={video.timing}
                setCanvasTime={settempCanvasTime}
                canvasTime={tempCanvasTime}
                ref={tempVideoRef}
              />
              <Quality
                showQualities={showQualities}
                setshowQualities={
                  video.loading ? () => undefined : setshowQualities
                }
                current={video.current}
                setcurrent={
                  video.loading
                    ? () => undefined
                    : (a) => setmedia((e) => ({ ...e, current: a }))
                }
                list={video_qualities}
              />
              <Volume
                volume={video.volume}
                setvolume={
                  video.loading
                    ? () => undefined
                    : (v) => setmedia((e) => ({ ...e, volume: v }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
