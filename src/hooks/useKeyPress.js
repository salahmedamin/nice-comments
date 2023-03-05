import { useEffect, useState } from "react";

export const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);
  
    useEffect(() => {
      const downHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(true);
        }
      };
  
      const upHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(false);
        }
      };
  
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
  
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }, [targetKey]);
  
    return keyPressed;
  };

export const useLeftKeyPress = (cb)=>{
  const leftPressed = useKeyPress("ArrowLeft")
  useEffect(() => {
    if (leftPressed) {
      cb()
    }
  }, [leftPressed]);
}

export const useRightKeyPress = (cb)=>{
  const rightPressed = useKeyPress("ArrowRight")
  useEffect(() => {
    if (rightPressed) {
      cb()
    }
  }, [rightPressed]);
}

export const useUpKeyPress = (cb)=>{
  const upPressed = useKeyPress("ArrowUp")
  useEffect(() => {
    if (upPressed) {
      cb()
    }
  }, [upPressed]);
}

export const useDownKeyPress = (cb)=>{
  const downPressed = useKeyPress("ArrowDown")
  useEffect(() => {
    if (downPressed) {
      cb()
    }
  }, [downPressed]);
}

export const useEnterKeyPress = (cb)=>{
  const enterPressed = useKeyPress("Enter")
  useEffect(() => {
    if (enterPressed) {
      cb()
    }
  }, [enterPressed]);
}

export const useSpaceKeyPress = (cb)=>{
  const spacePressed = useKeyPress(" ")
  useEffect(() => {
    if (spacePressed) {
      cb()
    }
  }, [spacePressed]);
}

export const useEscKeyPress = (cb)=>{
  const escPressed = useKeyPress("Escape")
  useEffect(() => {
    if (escPressed) {
      cb()
    }
  }, [escPressed]);
}

export const useCustomKeyPress = (key, cb)=>{
  const keypressed = useKeyPress(key)
  useEffect(() => {
    if (keypressed) {
      cb()
    }
  }, [keypressed]);
}