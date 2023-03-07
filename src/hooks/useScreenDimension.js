import { useEffect, useState } from "react";

export const useScreenDimension = () => {
  const [screenWidth, setscreenWidth] = useState(window.innerWidth);
  const [screenHeight, setscreenHeight] = useState(window.innerHeight);
  useEffect(() => {
    const onResize = () => {
      setscreenWidth(window.innerWidth);
      setscreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return [screenWidth, screenHeight];
};
