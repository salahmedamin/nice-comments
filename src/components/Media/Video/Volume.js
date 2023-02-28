import {
  VolumeDownOutlined,
  VolumeMuteOutlined,
  VolumeOffOutlined,
  VolumeUpOutlined
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addOpacity } from "../../../functions/addOpacity";

export default function Volume({ volume, setvolume }) {
  const volBarRef = useRef(null);
  const calcVol = (e) => {
    const domrect = volBarRef.current?.getBoundingClientRect();
    let [y, height] =
      domrect && domrect.y && domrect?.height
        ? [domrect.y, domrect.height]
        : [0, 0];
    const vol = e.clientY - y;
    const percentage = (vol * 100) / height;
    setvolume(Math.abs(percentage - 100));
  };
  const [showVolBar, setshowVolBar] = useState(false);
  const [lastVolume, setlastVolume] = useState(null);
  const between = useCallback((v, a, b) => v >= a && v <= b, []);
  const theme = useTheme();
  useEffect(() => {
    if (!volume) return;
    setlastVolume(volume);
  }, [volume]);
  const VolumeIcon = useMemo(
    () =>
      volume === 0
        ? VolumeOffOutlined
        : between(volume, 0.000000001, 39)
        ? VolumeMuteOutlined
        : between(volume, 40, 80)
        ? VolumeDownOutlined
        : VolumeUpOutlined,
    [volume]
  );
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: 20,
      }}
      onMouseOver={() => setshowVolBar(true)}
      onMouseOut={() => setshowVolBar(false)}
    >
      <div
        style={{
          height: 100,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bottom: "100%",
          justifyContent: "center",
          visibility: showVolBar ? "visible" : "hidden",
          opacity: showVolBar ? 1 : 0,
          position: "absolute",
          overflow: "hidden",
          transition: ".3s ease all",
          paddingTop: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          background: addOpacity(theme.palette.primary.dark, 0.7),
        }}
      >
        <div
          ref={volBarRef}
          style={{
            height: "100%",
            width: 8,
            // border: "1px solid "+colors.white,
            // background: colors.gray+"60",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
          onClick={calcVol}
        >
          <div
            style={{
              height: "100%",
              width: 1,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#ffffff",
            }}
          />
          <div
            style={{
              height: volume,
              width: "50%",
              background: "#ffffff",
              borderRadius: 5,
            }}
          />
        </div>
      </div>
      <div style={{
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}>
        <VolumeIcon
          style={{
            width: 20,
            cursor: "pointer",
          }}
          onClick={() => setvolume(volume === 0 ? lastVolume ?? 50 : 0)}
        />
      </div>
    </div>
  );
}
