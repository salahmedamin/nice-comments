import { ArrowBackOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useScreenWidth } from "../../hooks/useScreenWidth";

export const BackButton = ({ right, cb }) => {
  const screenWidth = useScreenWidth()
  return (
    <Box
      onClick={() => (cb ? cb() : undefined)}
      style={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "rgb(0,0,0,.79)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        zIndex: 4,
        right: right ? ((screenWidth - 600) / 2) - 80 : undefined,
        transform: `translateY(-50%)${right ? " rotate(180deg)" : ""}`,
        left: !right ? ((screenWidth - 600) / 2) - 80 : undefined,
        cursor: "pointer",
        top: "50%",
        boxShadow: "0px 0px 50px 1px rgb(255,255,255,.2)",
        transition: ".3s ease all"
      }}
    >
      <ArrowBackOutlined style={{ color: "white" }} />
    </Box>
  );
};
