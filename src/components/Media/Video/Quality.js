import { HighQualityOutlined } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { addOpacity } from "../../../functions/addOpacity";

export default function Quality({
  current,
  setcurrent,
  list,
  showQualities,
  setshowQualities,
}) {
  const ref = useRef(null);

  useOnClickOutside(ref, () => setshowQualities(false));
  const theme = useTheme();

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: "100%",
        width: 20,
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => setshowQualities(!showQualities)}
      >
        <HighQualityOutlined
          style={{
            width: 20,
            cursor: "pointer",
          }}
        />
      </div>
      <div
        style={{
          transform: `translateX(-50%)`,
          position: "absolute",
          bottom: "100%",
          transition: ".3s ease all",
          visibility: showQualities ? "visible" : "hidden",
          borderTopRightRadius: 3,
          borderTopLeftRadius: 3,
          opacity: showQualities ? 1 : 0,
          left: "50%",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          background: addOpacity(theme.palette.primary.dark, 0.9),
        }}
      >
        {list.map((a, i) => (
          <IconButton
            key={i}
            onClick={() => {
              setshowQualities(false);
              setcurrent(list.findIndex((e) => e.quality === a.quality));
            }}
            style={{
              borderRadius: 5,
              padding: 5,
              fontSize: 13,
              color:
                theme.palette.primary[
                  list[current].quality !== a.quality ? "light" : "dark"
                ],
              // margin: 3,
              background:
                list[current].quality === a.quality
                  ? theme.palette.primary.light
                  : undefined,
            }}
          >
            {a.quality}
          </IconButton>
        ))}
      </div>
    </div>
  );
}
