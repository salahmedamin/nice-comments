import { useMediaQuery } from "@mui/material";

export const useMediaQuerySizes = () => {
  const isXS = useMediaQuery((t) => t.breakpoints.down("sm"));
  const isSM = useMediaQuery((t) => t.breakpoints.between("sm", "md"));
  const isMD = useMediaQuery((t) => t.breakpoints.between("md", "lg"));
  const isLG = useMediaQuery((t) => t.breakpoints.between("lg", "xl"));
  return {
    isXS,
    isSM,
    isMD,
    isLG,
  };
};
