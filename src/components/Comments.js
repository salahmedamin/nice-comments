import { CloseOutlined, FlagOutlined, SortOutlined } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  Grid,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import WithMenu from "../HOC/WithMenu";
import { useMediaQuerySizes } from "../hooks/useMediaQuerySizes";
import { Comment } from "./Comment";
import { PossibleReactions } from "./Reaction";
import Snippet from "./Snippet";
import { Write } from "./Write";

const comments = [
  {
    user: {
      fName: "Mohamed Amine",
      lName: "Salah",
      name: "aminesalah",
      image: "https://xsgames.co/randomusers/assets/avatars/male/74.jpg",
    },
    reactions: {
      own: "angry",
      total: 1135698,
      groups: [
        {
          image:
            "https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/good.svg",
          total: 9,
        },
        {
          image:
            "https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/heart.svg",
          total: 10,
        },
        {
          image:
            "https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/sad.svg",
          total: 8,
        },
        {
          image:
            "https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/angry.svg",
          total: 12,
        },
        {
          image:
            "https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/funny.svg",
          total: 30,
        },
      ],
    },
    content: [
      {
        line: 0,
        content:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi",
      },
      {
        line: 1,
        content: "Ligne 2 ^^",
      },
    ],
    media: {
      url: "http://25.media.tumblr.com/tumblr_m472i9O3O31qlme4do1_500.jpg",
    },
    replies: 5,
    date: 1676159540212,
  },
  {
    user: {
      fName: "Lee Junior",
      lName: "Kamavinga",
      name: "leejkama",
      image:
        "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
    },
    reactions: {
      own: "",
      total: 1530,
      groups: [
        {
          image:
            "https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/good.svg",
          total: 9,
        },
        {
          image:
            "https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/heart.svg",
          total: 10,
        },
        {
          image:
            "https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/sad.svg",
          total: 8,
        },
        {
          image:
            "https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/angry.svg",
          total: 12,
        },
      ],
    },
    content: [
      {
        line: 0,
        content: "Short text behavior",
      },
    ],
    replies: 5,
    date: 1675342980000,
  },
  {
    user: {
      fName: "Your",
      lName: "Master",
      name: "ymast",
      image:
        "https://st2.depositphotos.com/3758943/6040/i/450/depositphotos_60400957-stock-photo-the-man-in-the-office.jpg",
    },
    reactions: {
      own: "",
      total: 0,
      groups: [],
    },
    content: [
      {
        line: 0,
        content: "MAY GOD HELP SYRIA 🙏🤲",
      },
    ],
    replies: 0,
    date: 1675342980000,
    media: {
      url: "https://media.npr.org/assets/img/2023/02/06/ap23037769391365_custom-c04e898b2ef07852fbc72fb3333f0082604f50f2-s1100-c50.jpg",
    },
  },
  {
    user: {
      fName: "Tech",
      lName: "Crunch",
      name: "techrunch",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7a3ec529632909.55fc107b84b8c.png",
    },
    reactions: {
      own: "",
      total: 0,
      groups: [],
    },
    content: [
      {
        line: 0,
        content: "Who said I'm bad at valorant bro",
      },
    ],
    media: {
      id: 1,
      unique: "uniqueaf",
      type: "video",
      duration: 626,
      name: "temp1.mp4",
      size: 6355665,
      video_qualities: [
        {
          url:
            "https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_624e701eba64a0.34411893_preview.mp4",
          quality: "720p",
        },{
          url:
            "https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_624e701eba64a0.34411893_preview.mp4",
          quality: "480p",
        },{
          url:
            "https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_624e701eba64a0.34411893_preview.mp4",
          quality: "270p",
        },
      ],
    },
    replies: 10,
    date: 1676113194000,
  },
  {
    user: {
      fName: "Mr",
      lName: "Valorant",
      name: "mvalo",
      image:
        "https://media.istockphoto.com/id/1170902285/photo/portrait-of-a-cool-guy-pointing-and-looking-up-impressed.jpg?s=612x612&w=0&k=20&c=Fs3iFBD-b6-21v3CgSdtFsqwiEVU-34WpTKxORJ7qVc=",
    },
    reactions: {
      own: "",
      total: 23,
      groups: [
        {
          image:
            "https://raw.githubusercontent.com/salahmedamin/betterify-front/master/public/images/post/reaction/sad.svg",
          total: 23,
        },
      ],
    },
    media: {
      url: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
    replies: 1,
    date: 1675940394000,
  },
  {
    user: {
      fName: "Mr",
      lName: "Beast",
      name: "mrbeast",
      image:
        "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
    },
    reactions: {
      own: "",
      total: 0,
      groups: [],
    },
    content: [
      {
        line: 0,
        content: "Wow I mean watch this, MAGICAL !",
      },
    ],
    media: {
      id: 1,
      unique: "uniqueaf",
      type: "video",
      duration: 626,
      name: "temp1.mp4",
      size: 6355665,
      video_qualities: [
        {
          url:
            "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
          quality: "720p",
        },
      ],
    },
    replies: 10,
    date: 1676113194000,
  },
  {
    user: {
      fName: "Mr",
      lName: "Beast",
      name: "mrbeast",
      image:
        "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
    },
    reactions: {
      own: "",
      total: 0,
      groups: [],
    },
    content: [
      {
        line: 0,
        content: "Wow I mean watch this, MAGICAL !",
      },
    ],
    media: {
      id: 1,
      unique:
        "https://sampleswap.org/samples-ghost/MELODIC%20LOOPS/WORLD%20LOOPS/2623[kb]093_pygmies.wav.mp3",
      type: "audio",
      duration: 626,
      name: "temp1.mp3",
      size: 6355665,
    },
    replies: 10,
    date: 1676113194000,
  },
];
export const Comments = () => {
  const [commentsHistory, setcommentsHistory] = useState([]);
  const [currentBranch, setcurrentBranch] = useState(0);
  const [showcommentsHistory, setshowcommentsHistory] = useState(false);
  const [replyingTo, setreplyingTo] = useState({});
  const isReplying = useMemo(
    () => Object.keys(replyingTo).length > 0,
    [replyingTo]
  );
  const { isLG, isMD, isSM, isXS } = useMediaQuerySizes();
  useEffect(() => {
    setcurrentBranch(commentsHistory.length);
  }, [commentsHistory.length]);

  return (
    <Grid
      item
      container
      minHeight={"100%"}
      direction="column"
      maxWidth={isXS ? window.innerWidth : 600}
      bgcolor="#18191A"
      color="white"
      fontFamily="'Inter', sans-serif"
      overflow="hidden"
      borderRadius={1}
      position="relative"
    >
      {/* HEADER PART */}
      <Stack
        direction="row"
        justifyContent="space-between"
        paddingY={commentsHistory.length === 0 ? 1.5 : 0.75}
        paddingX={"18px"}
        boxShadow="0px 0px 20px 5px rgb(0,0,0,0.83)"
        zIndex={1}
        maxHeight={"78.5px"}
      >
        {/* COMMENTS TITLE */}
        {commentsHistory.length === 0 ? (
          <Typography
            fontSize="15px"
            fontWeight="600"
            display={"flex"}
            alignItems="center"
            maxHeight={"50px"}
          >
            Comments
          </Typography>
        ) : (
          <Grid
            style={{
              position: "relative",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setshowcommentsHistory(true);
            }}
          >
            <Snippet
              text={`${commentsHistory.at(currentBranch - 1).fName} ${
                commentsHistory.at(currentBranch - 1).lName
              }`}
              suffix={"'s comment"}
              image={commentsHistory.at(currentBranch - 1).image}
              backButtonCallback={() => {
                setshowcommentsHistory(false);
                setcommentsHistory(
                  commentsHistory.filter(
                    (_, i) => i < commentsHistory.length - 1
                  )
                );
              }}
            />
          </Grid>
        )}
        {/* SORT */}
        {currentBranch === 0 ? (
          <WithMenu
            content={"HELLO"}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {({ handleClick }) => (
              <IconButton
                style={{ display: "flex", gap: "4px", alignItems: "center" }}
                sx={{
                  "&:hover, &.Mui-focusVisible": {
                    backgroundColor: "rgba(217,217,217,.1)",
                  },
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid transparent",
                }}
                onClick={handleClick}
              >
                <SortOutlined fontSize="small" style={{ color: "white" }} />
                <Typography
                  fontSize={13}
                  fontWeight="600"
                  sx={{
                    color: "white",
                  }}
                >
                  Sort
                </Typography>
              </IconButton>
            )}
          </WithMenu>
        ) : (
          <PossibleReactions
            menuStyle={{
              display: "flex",
              alignItems: "center",
            }}
            reactions={commentsHistory.at(currentBranch - 1)?.reactions}
          />
        )}
      </Stack>
      {/* ALL COMMENTS */}
      {/* FOR REACH BRANCH IN TREE OF NAVIGATION, CREATE A NEW VIEW */}
      <Stack direction={"row"} maxWidth={"100%"} flexGrow={1}>
        {["Original Post", ...commentsHistory].map((e, i) => (
          <PerfectScrollbar
            key={i}
            style={{
              minWidth: "100%",
              minHeight: "100%",
              height: 800,
              transform: `translateX(-${currentBranch * 100}%)`,
              transition: ".3s ease all",
            }}
          >
            <Stack
              direction="column"
              // spacing={3}
              padding={2}
              maxHeight={500}
              // style={{ overflowY: "scroll" }}
            >
              {comments.map((e, i) => (
                <Comment
                  key={i}
                  {...e}
                  last={i === comments.length - 1}
                  addCommentsHistory={(v) => {
                    setcommentsHistory([...commentsHistory, v]);
                  }}
                  replyingTo={replyingTo}
                  setReplyingTo={setreplyingTo}
                />
              ))}
            </Stack>
          </PerfectScrollbar>
        ))}
      </Stack>
      {/* WRITE A COMMENT */}
      <Write
        before={
          isReplying ? (
            <Stack direction={"row"} justifyContent="space-between">
              <Typography
                fontSize={12}
                display={"flex"}
                alignItems={"center"}
                marginBottom={"5px"}
              >
                <span style={{ marginRight: "5px" }}>Replying to</span>
                <Snippet
                  hideBackButton={true}
                  forceHover={true}
                  image={replyingTo.user.image}
                  text={replyingTo.user.name}
                  imageStyle={{
                    width: 20,
                    height: 20,
                  }}
                  textStyle={{
                    fontSize: 12,
                  }}
                />
              </Typography>
              <Snippet
                forceHover={true}
                hideBackButton={true}
                onClick={(e) => {
                  setreplyingTo({});
                }}
                overrideImage={
                  <CloseOutlined
                    style={{
                      width: 10,
                      height: 10,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  />
                }
              />
            </Stack>
          ) : null
        }
      />
      {/* OVERLAY HISTORY OF COMMENTS */}

      <ClickAwayListener
        onClickAway={(e) => {
          e.stopPropagation();
          if (showcommentsHistory) {
            setcommentsHistory(
              commentsHistory.filter((_, index) => index + 1 <= currentBranch)
            );
          }
          setshowcommentsHistory(false);
        }}
      >
        <Grid
          position={"absolute"}
          top={0}
          right={0}
          padding={"12px"}
          zIndex={5}
          height={"100%"}
          sx={{
            boxShadow: "0px 0px 25px 2px rgb(0,0,0)",
            backgroundColor: "#18191A",
            transform: `translateX(${showcommentsHistory ? "0" : "200"}%)`,
            transition: ".3s ease all",
          }}
        >
          <PerfectScrollbar>
            <Snippet
              style={{
                minWidth: "100%",
                justifyContent: "flex-start",
                backgroundColor:
                  0 === currentBranch ? "rgb(80,144,211,.5)" : undefined, //"#5090D3" same but rgb
              }}
              text={"Main Comments Page"}
              overrideImage={
                <FlagOutlined
                  style={{
                    color: "rgb(217,217,217)",
                    height: 30,
                    width: 30,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                />
              }
              hideBackButton={true}
              onClick={() => {
                setcurrentBranch(0);
              }}
            />
            {commentsHistory.length > 0 ? (
              <Box
                style={{
                  marginLeft: "24px",
                  borderLeft: "1px solid rgb(80,80,80)",
                  width: "1px",
                  height: "30px",
                }}
              />
            ) : null}
            {commentsHistory.map((e, i) => (
              <React.Fragment key={i}>
                <Snippet
                  key={i}
                  style={{
                    minWidth: "100%",
                    justifyContent: "flex-start",
                    backgroundColor:
                      i + 1 === currentBranch
                        ? "rgb(80,144,211,.5)"
                        : undefined, //"#5090D3" same but rgb
                  }}
                  text={`${e.fName} ${e.lName}`}
                  suffix={"'s comment"}
                  image={e.image}
                  hideBackButton={true}
                  onClick={() => setcurrentBranch(i + 1)}
                />
                {i === commentsHistory.length - 1 ? null : (
                  <Box
                    style={{
                      marginLeft: "24px",
                      borderLeft: "1px solid rgb(217,217,217,.6)",
                      width: "1px",
                      height: "30px",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </PerfectScrollbar>
        </Grid>
      </ClickAwayListener>
    </Grid>
  );
};
