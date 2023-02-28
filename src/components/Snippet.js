import { ArrowBack } from "@mui/icons-material";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

function Snippet({
  style,
  text,
  image,
  overrideImage,
  hideBackButton,
  backButtonCallback,
  textStyle,
  imageStyle,
  forceHover = false,
  suffix="",
  prefix="",
  ...HTMLProps
}) {
  return (
    <IconButton
      style={{ display: "flex", gap: "5px", alignItems: "center", ...style }}
      sx={{
        "&:hover, &.Mui-focusVisible": forceHover
          ? {}
          : {
              backgroundColor: "rgba(217,217,217,.1)",
            },
        backgroundColor: !forceHover ? {} : "rgba(217,217,217,.1)",
        padding: "5px",
        borderRadius: "5px",
      }}
      {...HTMLProps}
    >
      {overrideImage ?? (
        <Avatar
          src={image}
          style={{ width: 40, height: 40, ...imageStyle }}
        />
      )}
      {text === undefined ? null : (
        <Stack direction={"column"} alignItems={"flex-start"}>
          <Typography fontSize={"13px"} color={"white"} style={textStyle}>
            { prefix }{text}{ suffix }
          </Typography>

          {hideBackButton ? null : (
            <Stack
              direction={"row"}
              alignItems="center"
              onClick={(e) => {
                e.stopPropagation();
                if (
                  backButtonCallback &&
                  typeof backButtonCallback === "function"
                )
                  backButtonCallback();
              }}
            >
              <ArrowBack style={{ color: "white", fontSize: "14px" }} />
              <Typography fontSize={"10px"} color={"white"}>
                Back
              </Typography>
            </Stack>
          )}
        </Stack>
      )}
    </IconButton>
  );
}

export default Snippet;
