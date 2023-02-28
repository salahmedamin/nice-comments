import { Box } from "@mui/material";
export const UserStoryBadge = ({ top }) => (
  <Box
    sx={{
      borderRadius: "50%",
      zIndex: 2,
      height: 128,
      width: 128,
      background: "black",
      transform: `translateY(${top ? "-64" : "64"}px)`,
      position: "absolute",
      top: top ? 0: undefined,
      bottom: !top ? 0: undefined,
      right: 0
    }}
  />
);
