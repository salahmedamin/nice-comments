import {
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  MoreVert,
  QuickreplyOutlined
} from "@mui/icons-material";
import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import emoji from "react-easy-emoji";
import { getDateDiff } from "../functions/getDateDiff";
import Hovered from "../HOC/Hovered";
import { LongText } from "../HOC/LongText";
import WithMenu from "../HOC/WithMenu";
import { useMediaQuerySizes } from "../hooks/useMediaQuerySizes";
import { MediaAudio } from "./Media/Audio";
import { MediaVideo } from "./Media/Video";
import { PossibleReactions, ReactionGroups, ReactionsTotal } from "./Reaction";
// function randomIntFromInterval(min, max) { // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }
export const Comment = ({
  user,
  reactions,
  media,
  content,
  date,
  replies,
  addCommentsHistory,
  last,
  replyingTo,
  setReplyingTo,
}) => {
  const { isLG, isMD, isSM, isXS } = useMediaQuerySizes();
  const theme = useTheme();
  return (
    // WHOLE COMMENT
    <Stack
      direction="row"
      padding={isXS ? 0 : "9px"}
      paddingLeft={"4px"}
      // width="100%"
      // borderRadius={"4px"}
      // boxShadow="0px 0px 18px 6px rgba(0, 0, 0, 0.25);"
      borderBottom={last ? undefined : "1px solid rgba(80,80,80)"}
      marginBottom={last ? undefined : "10px"}
      spacing={isXS ? 0 : "10px"}
    >
      {/* LEFT PART - IMAGE, REACTS AND TOTAL */}
      <Stack
        direction="column"
        maxWidth="30%"
        minWidth="88px"
        spacing="6px"
        alignItems="center"
        sx={{
          display: isXS ? "none" : undefined,
        }}
      >
        {/* USER IMAGE */}
        <Avatar src={user.image} style={{ width: 50, height: 50 }} />
        {/* REACTS */}
        <ReactionGroups groups={reactions.groups} />
        {/* TOTAL OF REACTS */}
        {reactions.total === 0 ? null : (
          <ReactionsTotal total={reactions.total} />
        )}
        {/* VERTICAL DIVIDER */}
        <Box
          style={{
            backgroundColor: "rgba(80,80,80)",
          }}
          height="100%"
          width="1px"
        />
      </Stack>
      {/* RIGHT PART */}
      <Stack direction="column" flexGrow="1">
        {/* NAME, USERNAME & OWN REACTION */}
        <Stack
          justifyContent="space-between"
          alignItems="flex-start"
          direction="row"
        >
          {/* FULL NAME,  USERNAME & DATE */}
          <Stack direction="column" maxHeight="35px" spacing="-10px">
            {/* FULLNAME & USERNAME */}
            <Stack direction="row" spacing="5px" alignItems="center">
              {isXS ? (
                <Avatar
                  src={user.image}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              ) : (
                <>
                  <Typography
                    fontSize="14px"
                    fontWeight="bold"
                    maxWidth="180px"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    title={`${user.fName} ${user.lName}`}
                  >{`${user.fName} ${user.lName}`}</Typography>
                  <Typography fontSize="20px" fontWeight="400">
                    &bull;
                  </Typography>{" "}
                </>
              )}
              <Typography
                fontSize={`${isXS ? 13 : 12}px`}
                fontWeight={isXS ? "bold" : 400}
                maxWidth="180px"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                color={isXS ? "white" : "rgb(150,150,150)"}
                title={`@${user.name}`}
              >
                {isXS ? "" : "@"}
                {user.name}
              </Typography>
              {!isXS ? null : (
                <>
                  <Typography fontSize="20px" fontWeight="400">
                    &bull;
                  </Typography>
                  <Typography
                    fontSize="10px"
                    fontWeight="400"
                    color={"rgb(150,150,150)"}
                  >
                    {getDateDiff(new Date(date), new Date(), true)}
                  </Typography>
                </>
              )}
            </Stack>
            {/* DATE */}
            {isXS ? null : (
              <Typography fontSize="10px" color={"rgb(150,150,150)"}>
                {getDateDiff(new Date(date), new Date(), true)}
              </Typography>
            )}
          </Stack>
          {/* OWN REACTION & MORE VERT */}
          <Stack
            direction="row"
            alignItems="center"
            style={{ transform: "translateX(10px)" }}
          >
            {/* OWN REACTION */}
            <PossibleReactions reactions={reactions} />
            <WithMenu content={"Options"} direction="column">
              {({ handleClick }) => (
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={handleClick}
                >
                  <MoreVert style={{ color: "white", cursor: "pointer" }} />
                </div>
              )}
            </WithMenu>
          </Stack>
        </Stack>
        {/* TEXT */}
        {!content || content.length === 0 ? null : (
          <LongText
            style={{
              marginBottom:
                !media || Object.keys(media).length === 0 ? undefined : "5px",
            }}
          >
            {({ showMore, ref, isLong }) => {
              return (
                <div
                  ref={ref}
                  style={{
                    maxHeight: showMore || !isLong ? undefined : "80px",
                    transition: "0.3s ease all",
                    overflow: "hidden",
                    // boxShadow: (isLong && showMore) || !isLong ? undefined : theme.palette.primary.light+" 5px -15px 20px -20px inset"
                  }}
                >
                  {content
                    .sort((a, b) => a.line - b.line)
                    .map((e, i) => (
                      <Typography
                        key={i}
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {emoji(e.content)}
                      </Typography>
                    ))}
                </div>
              );
            }}
          </LongText>
        )}
        {/* MEDIA */}
        {!media || Object.keys(media).length === 0 ? null : media.type ===
          "video" ? (
          <MediaVideo isSingle={true} {...media} />
        ) : media.type === "audio" ? (
          <MediaAudio {...media} />
        ) : (
          <Avatar
            src={media.url || media.unique}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 5,
              objectFit: "contain",
            }}
          />
        )}
        {/* REPLIES */}
        <Stack
          flexGrow="1"
          alignItems="flex-end"
          justifyContent="space-between"
          direction="row"
          marginTop="5px"
        >
          <Hovered>
            {(hovered) => (
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="center"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setReplyingTo({
                    user,
                  })
                }
              >
                <ChatBubbleOutline
                  style={{
                    color: hovered ? "#5090D3" : "white",
                    width: 15,
                    height: 15,
                    transition: ".3s ease all",
                  }}
                />
                <Typography
                  style={{
                    fontWeight: 500,
                    fontSize: 12,
                    color: hovered ? "#5090D3" : "white",
                    padding: 8,
                    transition: ".3s ease all",
                  }}
                >
                  Reply
                </Typography>
              </Stack>
            )}
          </Hovered>
          {isXS && reactions.total > 0 ? (
            <Hovered>
              {(hovered) => (
                <Stack
                  direction={"rows"}
                  alignItems="center"
                  justifyContent={"center"}
                  spacing={2}
                >
                  <FavoriteBorderOutlined
                    style={{
                      color: hovered ? "#5090D3" : "white",
                      width: 15,
                      height: 15,
                      transition: ".3s ease all",
                      cursor: "pointer",
                    }}
                  />
                  <ReactionsTotal
                    useHovered={false}
                    style={{
                      color: hovered ? "#5090D3" : "white",
                      fontWeight: 500,
                      fontSize: 12,
                      padding: 8,
                    }}
                    total={reactions.total}
                  />
                </Stack>
              )}
            </Hovered>
          ) : null}
          {replies === 0 ? null : (
            <Hovered>
              {(hovered) => (
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent="center"
                  onClick={() => addCommentsHistory({ ...user, reactions })}
                  spacing={1}
                  style={{ cursor: "pointer" }}
                  padding={"8px 0px"}
                >
                  <QuickreplyOutlined
                    style={{
                      color: hovered ? "#5090D3" : "white",
                      width: 15,
                      height: 15,
                      transition: ".3s ease all",
                    }}
                  />
                  <Typography
                    style={{
                      fontWeight: 500,
                      fontSize: 12,
                      color: hovered ? "#5090D3" : "white",
                      transition: ".3s ease all",
                    }}
                  >
                    {replies} Repl{replies !== 1 ? "ies" : "y"}
                  </Typography>
                </Stack>
              )}
            </Hovered>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
