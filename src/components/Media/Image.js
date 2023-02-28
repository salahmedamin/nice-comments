import { Person2Outlined } from "@mui/icons-material";
import { Box, Grid, useTheme } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { isValidURL } from "../../functions/isValidURL";

export const MediaImage = (
    props
  ) => {
    const [showFaces, setshowFaces] = useState<boolean>(false);
    const [oneRender, setoneRender] = useState<boolean>(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const linkSrc = useMemo(
      () =>
        isValidURL(props.unique || "")
          ? props.unique || ""
          : `${props.unique}`,
      []
    );
    useEffect(() => {
      if (!!props.render) setoneRender(true);
    }, [props.render]);
  
    const theme = useTheme();
    return (
      <Box
        width={"100%"}
        height={props.height || 450}
        position={"relative"}
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
        overflow={"hidden"}
      >
        {!!props.faces && props.faces?.length > 0 ? (
          <>
            {props.faces.map((e, i) => (
              <Box
                key={i}
                position={"absolute"}
                style={{
                  ...e,
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  opacity: Number(showFaces),
                  visibility: showFaces ? "visible" : "hidden",
                  transition: ".1s ease all",
                  borderRadius: 6,
                  padding: 4,
                  paddingLeft: 7,
                  paddingRight: 7,
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  gap: 5,
                  cursor: "pointer",
                  zIndex: 2,
                }}
              >
                <img
                  src={e.profilePic}
                  width={22}
                  height={22}
                  style={{ borderRadius: "50%" }}
                />
                {e.username}
              </Box>
            ))}
            <Grid
              style={{
                position: "absolute",
                left: 10,
                bottom: 10,
                border: `1px solid ${theme.palette.primary.contrastText}`,
                background: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                cursor: "pointer",
                zIndex: 2,
                padding: 5,
              }}
              onClick={() => setshowFaces(!showFaces)}
            >
              <Person2Outlined
                fontSize="small"
                style={{
                  color: theme.palette.primary.contrastText,
                }}
              />
            </Grid>
          </>
        ) : null}
        <div
          ref={imgRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: oneRender ? `url(${linkSrc})` : undefined,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            zIndex: 1,
            position: "absolute",
            backdropFilter: "blur(20px)",
          }}
        />
        <div
          ref={imgRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: oneRender ? `url(${linkSrc})` : undefined,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            zIndex: 0,
            position: "absolute",
            filter: "blur(20px)",
          }}
        />
      </Box>
    );
  };
  
  
  
  
