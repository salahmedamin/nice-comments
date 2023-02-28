import { useEffect, useState } from "react";

export const useScreenWidth = ()=>{
    const [screenWidth, setscreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setscreenWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return screenWidth
}