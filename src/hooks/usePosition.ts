import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type MouseEvent,
  type ChangeEvent,
  type TouchEvent,
} from "react";

export interface IPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  mouseX: number;
  mouseY: number;
}

export const usePosition = () => {
  const [position, setPosition] = useState<IPosition | null>(null);
  const elementRef = useRef<HTMLElement>(null);

  const updatePosition = useCallback(
    (evt?: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let clientX = 0;
      let clientY = 0;

      if (evt) {
        if ("touches" in evt) {
          clientX = evt.touches[0].clientX;
          clientY = evt.touches[0].clientY;
        } else {
          clientX = evt.clientX;
          clientY = evt.clientY;
        }
      }

      setPosition({
        x: rect.left + scrollX,
        y: rect.top + scrollY,
        width: rect.width,
        height: rect.height,
        mouseX: clientX,
        mouseY: clientY,
      });
    },
    []
  );

  const handleMouseEnter = useCallback(
    (evt: MouseEvent<HTMLElement>) => {
      elementRef.current = evt.currentTarget;
      updatePosition(evt);
    },
    [updatePosition]
  );

  const handleMouseMove = useCallback(
    (evt: MouseEvent<HTMLElement>) => {
      updatePosition(evt);
    },
    [updatePosition]
  );

  const handleSubmit = useCallback(
    (evt: ChangeEvent<HTMLFormElement>) => {
      elementRef.current = evt.currentTarget;
      updatePosition();
    },
    [updatePosition]
  );

  const handleTouch = useCallback(
    (evt: TouchEvent<HTMLElement>) => {
      elementRef.current = evt.currentTarget;
      updatePosition(evt);
    },
    [updatePosition]
  );

  useEffect(() => {
    const handleScrollOrResize = () => updatePosition();

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [updatePosition]);

  return {
    position,
    handleMouseEnter,
    handleMouseMove,
    handleSubmit,
    handleTouch,
    elementRef,
    updatePosition,
  };
};
