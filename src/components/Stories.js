import { Stack } from "@mui/material";
import React, { useState } from "react";
import { BackButton } from "./Stories/BackButton";
import { Story } from "./Stories/Story";
import { UserStoryBadge } from "./Stories/UserStoryBadge";

export const Stories = () => {
  const [main, setmain] = useState(0);
  const images = [
    "https://i.pinimg.com/736x/71/ee/85/71ee85afbe9f5269315dfaaa61ad69f4.jpg",
    "https://i.pinimg.com/originals/98/db/bb/98dbbb3342ef9bf40ec6d424bc0eba77.jpg",
    "https://marketplace.canva.com/EAFGBqew2mQ/1/0/900w/canva-brown-aesthetic-friend-photo-collage-instagram-story-pmgP1AZHrvk.jpg",
    "https://i.pinimg.com/736x/71/ee/85/71ee85afbe9f5269315dfaaa61ad69f4.jpg",
    "https://i.pinimg.com/736x/71/ee/85/71ee85afbe9f5269315dfaaa61ad69f4.jpg",
    "https://i.pinimg.com/736x/71/ee/85/71ee85afbe9f5269315dfaaa61ad69f4.jpg",
    "https://i.pinimg.com/736x/71/ee/85/71ee85afbe9f5269315dfaaa61ad69f4.jpg",
  ];
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
      <UserStoryBadge top />
      {/* to align items at center */}
      <Stack direction={"row"} flexGrow={1} width="100%" position="relative">
        <div
          style={{
            opacity: main === 0 ? 0 : 1,
            visibility: main === 0 ? "hidden" : "visible",
            transition: ".3s ease all",
            zIndex: 4
          }}
        >
          <BackButton cb={() => main === 0 ? undefined : setmain(main - 1)} />
        </div>
        <div
          style={{
            opacity: main === images.length - 1 ? 0 : 1,
            visibility: main === images.length - 1 ? "hidden" : "visible",
            transition: ".3s ease all",
            zIndex: 4
          }}
        >
          <BackButton right cb={() => main === images.length - 1 ? undefined : setmain(main + 1)} />
        </div>
        {images.map((img, e) => (
          <Story
            //   onMainClick={() => {
            //     if (main < 6) setmain(main + 1);
            //   }}
            index={e}
            mainIndex={main}
            key={e}
            image={img}
            endOfStoryCb={() =>
              main < images.length - 1 ? setmain(main + 1) : undefined
            }
          />
        ))}
      </Stack>
      <UserStoryBadge />
    </Stack>
  );
};
