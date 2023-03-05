import { AddReactionOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import Hovered from "../HOC/Hovered";
import WithMenu from "../HOC/WithMenu";
import { possiblereactions, reactionsBg } from "../static/reactions";

export const PossibleReactions = ({
  reactions = {},
  menuStyle,
  menuProps = {},
  onEmojiPress=async()=>undefined,
  useEmojiBg = true,
  emojisStyle={},
  currentEmojiStyle={}
}) => {
  return (
    <WithMenu
      style={menuStyle}
      content={({ setopen }) =>
        possiblereactions.map((e, i) => (
          <IconButton
            key={i}
            sx={{
              "&:hover, &.Mui-focusVisible": {
                backgroundColor: reactionsBg.find((a) => a.name === e).bg,
              },
              padding: "8px",
            }}
            onClick={async(e) => {
              e.stopPropagation();
              setopen(false);
              if(typeof onEmojiPress === "function") await onEmojiPress(possiblereactions[i].toLowerCase())
            }}
          >
            <Avatar
              src={`https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/${e.toLowerCase()}.svg`}
              style={{
                width: 20,
                height: 20,
                ...emojisStyle
              }}
            />
          </IconButton>
        ))
      }
      {...menuProps}
    >
      {({ handleClick }) => (
        <div
          style={{ cursor: "pointer", position: "relative" }}
          onClick={handleClick}
        >
          <IconButton
            sx={{
              "&:hover, &.Mui-focusVisible": {
                backgroundColor: !useEmojiBg
                  ? undefined
                  : !!reactions.own && reactions.own.length > 0
                  ? reactionsBg.find(
                      (a) => a.name.toLowerCase() === reactions.own
                    ).bg
                  : "rgba(217,217,217,.1)",
              },
              padding: "4px",
              borderRadius: 2,
            }}
          >
            {!!reactions.own && reactions.own.length > 0 ? (
              <Avatar
                src={`https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/${reactions.own}.svg`}
                style={{
                  width: 20,
                  height: 20,
                  ...currentEmojiStyle
                }}
              />
            ) : (
              <AddReactionOutlined style={{ color: "white" }} />
            )}
          </IconButton>
        </div>
      )}
    </WithMenu>
  );
};

export const ReactionsTotal = ({ total, style = {}, useHovered = true }) => {
  return useHovered ? (
    <Hovered>
      {(hovered) => (
        <Typography
          sx={{
            cursor: "pointer",
            color: hovered ? "#5090D3" : "white",
            transition: ".3s ease all",
          }}
          fontWeight="bold"
          fontSize="11px"
          style={style}
        >
          {Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(total)}
        </Typography>
      )}
    </Hovered>
  ) : (
    <Typography
      sx={{
        cursor: "pointer",
        color: "white",
        transition: ".3s ease all",
      }}
      fontWeight="bold"
      fontSize="11px"
      style={style}
    >
      {Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(total)}
    </Typography>
  );
};

export const ReactionGroups = ({ groups, imageStyle = {} }) => {
  return (
    <Stack
      direction="row"
      spacing="-8px"
      width="100%"
      maxWidth={"88px"}
      justifyContent="center"
    >
      {groups
        .sort((a, b) => a.total - b.total)
        .map((e, i) => (
          <IconButton
            key={i}
            sx={{
              "&:hover, &.Mui-focusVisible": {
                backgroundColor: "rgba(217,217,217,.1)",
              },
              padding: "5px",
            }}
          >
            <Avatar
              style={{
                cursor: "pointer",
                width: 15,
                height: 15,
                zIndex: groups.length - i,
                ...imageStyle,
              }}
              src={e.image}
            />
          </IconButton>
        ))}
    </Stack>
  );
};
