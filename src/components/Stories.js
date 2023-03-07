import { Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useLeftKeyPress, useRightKeyPress } from "../hooks/useKeyPress";
import { Story } from "./Stories/Story";
import axios from "axios";

export const Stories = () => {
  const [songs, setsongs] = useState([]);
  const songs_ids = useMemo(() => ["ogdsnIWGqt4", "CY8E6N5Nzec"], []);
  const [loading, setloading] = useState(true);
  //on initial load, load all songs playing URL
  useEffect(() => {
    const fetchURL = "https://l7xtog-3000.preview.csb.app/stream/";
    for (const song of songs_ids) {
      axios
        .get(fetchURL + song)
        .then((e) =>
          setsongs((prev) => [...prev, { id: song, url: e.data.url }])
        );
      console.log(songs);
    }
    console.log(songs);
  }, []);
  //on songs length change, check if songs_ids.length === songs.length => LOADING COMPLETE
  useEffect(() => {
    if (songs_ids.length === songs.length) setloading(false);
  }, [songs, songs_ids]);
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
        duration: 60,
        mediaURL:
          "https://fashiontravelrepeat.com/wp-content/uploads/2020/09/Travel-Instagram-Story-Tutorial-Idea-576x1024.jpg",
        music: {
          start: 22,
          title:
            "Enjoy Your Day 🍂 Chill songs to make you feel positive and calm ~ morning songs",
          url: songs.find((e) => e.id === "ogdsnIWGqt4")?.url,
        },
      },
      {
        user: ena,
        music: {},
        mediaURL:
          "https://foreveramber.co.uk/wp-content/uploads/2014/07/beach-sunset.jpg",
      },
      {
        user: chahin,
        music: {
          title:
            "Marshmello & Anne-Marie - FRIENDS (Lyric Video) *OFFICIAL FRIENDZONE ANTHEM*",
          url: songs.find((e) => e.id === "CY8E6N5Nzec")?.url,
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
    [songs]
  );
  //custom hooks
  useLeftKeyPress(() => (main > 0 ? setmain((e) => e - 1) : undefined));
  useRightKeyPress(() =>
    main < stories.length - 1 ? setmain((e) => e + 1) : undefined
  );
  const [displayMode, setdisplayMode] = useState("V"); //V or H
  return loading ? (
    "LOADING..."
  ) : (
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
        <div
          onClick={() => setdisplayMode((e) => (e === "H" ? "V" : "H"))}
          style={{
            position: "absolute",
            top: 5,
            left: 5,
            color: "white",
            cursor: "pointer",
            border: "1px solid white",
            borderRadius: 25,
            padding: 5,
          }}
        >
          Toggle display mode: {displayMode}
        </div>
        {stories.map((story, e) => (
          <Story
            //   onMainClick={() => {
            //     if (main < 6) setmain(main + 1);
            //   }}
            displayMode={displayMode}
            firstStory={e === 0}
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
