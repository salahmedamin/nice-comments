import {
  PauseOutlined,
  PlayArrowOutlined,
  ReplayOutlined
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { Loading } from "./Loading";

export default function SwitchPlay({ playing, pause, play, loading, ended }) {
  const theme = useTheme();
  const Image = useMemo(
    () =>
      ended ? ReplayOutlined : playing ? PauseOutlined : PlayArrowOutlined,
    [ended, playing]
  );
  return loading ? (
    <Loading
      style={{
        width: 15,
        height: "100%",
        cursor: "pointer",
      }}
      color={theme.palette.primary.light}
    />
  ) : (
    <Image
      style={{
        width: 20,
        height: 20,
        cursor: "pointer",
      }}
      onClick={ended || !playing ? play : pause}
    />
  );
}
