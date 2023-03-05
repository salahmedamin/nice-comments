import { Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useLeftKeyPress, useRightKeyPress } from "../hooks/useKeyPress";
import { Story } from "./Stories/Story";

export const Stories = () => {
  const [main, setmain] = useState(0);
  const [clearMode, setclearMode] = useState(false);
  const ena = useMemo(
    () => ({
      fName: "Mohamed Amine",
      lName: "Salah",
      image: "https://xsgames.co/randomusers/assets/avatars/male/63.jpg",
      name: "amin._.salah",
    }),
    []
  );
  const chahin = useMemo(
    () => ({
      fName: "Chahin",
      lName: "Salah",
      image:
        "https://lastfm.freetls.fastly.net/i/u/ar0/7601902b23500ca99e883543fdfc5cdb",
      name: "chahinsalah",
    }),
    []
  );
  const stories = useMemo(
    () => [
      {
        user: ena,
        music: {},
        mediaURL:
          "https://i.pinimg.com/736x/71/ee/85/71ee85afbe9f5269315dfaaa61ad69f4.jpg",
      },
      {
        user: ena,
        music: {},
        mediaURL:
          "https://foreveramber.co.uk/wp-content/uploads/2014/07/beach-sunset.jpg",
      },
      {
        user: ena,
        music: {
          title:
            "Marshmello & Anne-Marie - FRIENDS (Lyric Video) *OFFICIAL FRIENDZONE ANTHEM*",
          url: "https://rr2---sn-4g5lzned.googlevideo.com/videoplayback?expire=1678070094&ei=7vwEZO-eLa7Sx_APp4uUcA&ip=167.235.8.246&id=o-ADW_Oc6kFR66AOv2EryN7by1bvGonwWlJc8vroxewFHP&itag=251&source=youtube&requiressl=yes&mh=dg&mm=31%2C26&mn=sn-4g5lzned%2Csn-f5f7knee&ms=au%2Conr&mv=m&mvi=2&pl=25&initcwndbps=247500&vprv=1&mime=audio%2Fwebm&ns=IKEiMU_6GnEnARuCUAMh8lUL&gir=yes&clen=3320559&dur=205.541&lmt=1672232994318871&mt=1678048146&fvip=2&keepalive=yes&fexp=24007246&c=WEB&txp=4532434&n=h665g5yme-jqTQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgRjCarlk5lTy9HNhu4bhhpCjGv3T35kpNLWeamh-ni4YCIGinFeEbLKrmsEbZNurRezSzKqDQG6Ld6xRwsCKSwDdm&sig=AOq0QJ8wRAIgAKZx0EXtXDgwDQrW1s903-NKic7yOB9Mkq1IZm61mAoCIFDMCogmGpsjpHed5tkILYS0tQhR_3dTeaar9i_6J7tE",
          start: 60,
        },
        duration: 30,
        mediaURL:
          "https://i.pinimg.com/originals/ef/9c/6d/ef9c6dd6931c8379ca1e94a1906324fc.jpg",
      },
      {
        user: chahin,
        music: {},
        mediaURL:
          "https://i.pinimg.com/originals/ea/fa/8f/eafa8ff0bf36103dc99cbece2c550b59.jpg",
      },
      {
        user: chahin,
        music: {},
        mediaURL:
          "https://i.pinimg.com/736x/41/91/44/41914408046212ee3089d0910d213e47.jpg",
      },
      {
        user: ena,
        music: {},
        mediaURL:
          "https://i.pinimg.com/736x/61/50/a7/6150a71463501bf139f225da041be119.jpg",
      },
      {
        user: chahin,
        music: {},
        mediaURL:
          "https://kindnessblogdotcom1.files.wordpress.com/2013/10/bmhry9ocyaaj6et-large.jpg",
      },
    ],
    []
  );
  //custom hooks
  useLeftKeyPress(() => (main > 0 ? setmain((e) => e - 1) : undefined));
  useRightKeyPress(() =>
    main < stories.length - 1 ? setmain((e) => e + 1) : undefined
  );
  return (
    <Stack
      direction={"column"}
      justifyContent="space-between"
      alignItems={"center"}
      position={"relative"}
      height="100vh"
      overflow={"hidden"}
      style={{
        background: "rgb(0,0,0,.79)",
      }}
    >
      {/* <UserStoryBadge top /> */}
      {/* to align items at center */}
      <Stack direction={"row"} flexGrow={1} width="100%" position="relative">
        {stories.map((story, e) => (
          <Story
            //   onMainClick={() => {
            //     if (main < 6) setmain(main + 1);
            //   }}
            clearMode={clearMode}
            setclearMode={setclearMode}
            index={e}
            mainIndex={main}
            setmain={setmain}
            key={e}
            image={story.mediaURL}
            hasMoreRight={e < stories.length - 1}
            hasMoreLeft={e > 0}
            endOfStoryCb={() =>
              main < stories.length - 1 ? setmain(main + 1) : undefined
            }
            {...story}
          />
        ))}
      </Stack>
      {/* <UserStoryBadge /> */}
    </Stack>
  );
};
