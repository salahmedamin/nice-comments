import { useCallback, useEffect, useState } from "react";

export const useDrag = (dragged, direction_threshold = 60) => {
  const [isDragging, setisDragging] = useState(false);
  const [mouseStartXY, setmouseStartXY] = useState({});
  const [mouseXY, setmouseXY] = useState({});
  const [counter, setcounter] = useState();
  const initDrag = useCallback(
    (e) => {
      setcounter(
        setTimeout(() => {
          setisDragging(true);
          document.body.style.cursor = "pointer"
          setmouseStartXY({
            x: e.clientX,
            y: e.clientY,
          });
        }, 70)
      );
    },
    [isDragging]
  );
  const dragging = useCallback(
    (e) => {
      console.log(isDragging);
      // if(!isDragging) return;
      setmouseXY({
        x: e.clientX,
        y: e.clientY,
      });
    },
    [isDragging]
  );
  const dragEnd = useCallback(
    (e) => {
      clearInterval(counter);
      setTimeout(() => {
        dragging(e);
        document.body.style.cursor = "default"
        setisDragging(false);
      }, 40);
    },
    [isDragging]
  );

  useEffect(() => {
    if (!dragged?.current) return;
    // dragged.current.draggable = true;
    const copy = dragged.current;
    //body
    document.body.addEventListener("mouseup", dragEnd);
    document.body.addEventListener("touchend", dragEnd);
    document.body.addEventListener("mousemove", dragging);
    //ref
    dragged.current.addEventListener("mousedown", initDrag);
    dragged.current.addEventListener("touchstart", initDrag);
    dragged.current.addEventListener("mouseup", dragEnd);
    dragged.current.addEventListener("touchend", dragEnd);
    dragged.current.addEventListener("mousemove", dragging);
    return () => {
      //body 
      document.body.removeEventListener("mouseup", dragEnd);
      document.body.removeEventListener("touchend", dragEnd);
      document.body.removeEventListener("mousemove", dragging);
      //ref
      copy.removeEventListener("mousedown", initDrag);
      copy.removeEventListener("touchstart", initDrag);
      copy.removeEventListener("mouseup", dragEnd);
      copy.removeEventListener("touchend", dragEnd);
      copy.removeEventListener("mousemove", dragging);
    };
  }, [dragged]);
  return {
    isDragging,
    mouseDragStart: mouseStartXY,
    currentPosition: mouseXY,
    toLeft:
      mouseStartXY.x - mouseXY.x > direction_threshold
        ? mouseStartXY.x - mouseXY.x
        : 0,
    toRight:
      mouseXY.x - mouseStartXY.x > direction_threshold
        ? mouseXY.x - mouseStartXY.x
        : 0,
    toTop:
      mouseStartXY.y - mouseXY.y > direction_threshold
        ? mouseStartXY.y - mouseXY.y
        : 0,
    toBottom:
      mouseXY.y - mouseStartXY.y > direction_threshold
        ? mouseXY.y - mouseStartXY.y
        : 0,
    isLeft: mouseStartXY.x - mouseXY.x > direction_threshold,
    isRight: mouseXY.x - mouseStartXY.x > direction_threshold,
    isTop: mouseStartXY.y - mouseXY.y > direction_threshold,
    isBottom: mouseXY.y - mouseStartXY.y > direction_threshold,
  };
};
