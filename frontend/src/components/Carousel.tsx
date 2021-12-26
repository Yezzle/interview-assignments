import React, {
  cloneElement,
  useEffect,
  ReactNode,
  Children,
  useState,
  useRef,
  CSSProperties,
} from "react";
import "./Carousel.css";

interface CarouselProps {
  readonly autoPlay?: Boolean;  // auto slides next
  delay?: number;   // time interval between next auto slide, defaults to ture, only works when autoPlay is true
  children?: ReactNode;
  duration?: number;    // slide animation duration, defaults to 0.4
  animate?: "ease" | "easeIn" | "easeOut" | "easeInOut";    // slide animation type, defaults to "ease"
}

export default function Carousel(props: CarouselProps) {
  const {
    autoPlay = true,
    delay = 3000,
    children,
    duration = 0.4,
    animate = "ease",
  } = props;

  const [intervalId, setIntervalId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalIndex = useRef<number>(currentIndex); // create mutable reference for setInterval task function
  const [rect, setRect] = useState<DOMRect>(); // save dom dementions which would cause rerender when compenent mounted

  const startInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (children && Array.isArray(children) && children.length > 1) {
      let toutId = window.setInterval(() => {
        setCurrentIndex((intervalIndex.current + 1) % children.length);
      }, delay);
      setIntervalId(toutId);
    }
  };

  // sync intervalIndex.current with currentIndex
  useEffect(() => {
    intervalIndex.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (autoPlay) {
      startInterval();
    }
    setRect(ref.current?.getBoundingClientRect());
    window.setIndex = setCurrentIndex;
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const handleActionBtClick = (index: number) => {
    setCurrentIndex(index);
    if (autoPlay) {
        startInterval();
    }
  };

  const childrenPage = Children.map(children, (child, index) => {
    let width: number = 0,
      height: number = 0;
    if (rect) {
      width = rect.width;
      height = rect.height;
    }
    const eleStyle = {
      minWidth: width ? width + "px" : "100%",
      height: height ? height + "px" : "100%",
      boxSizing: "border-box",
    };

    if (!React.isValidElement(child) || !child) return child;
    return (
      child &&
      cloneElement(child, {
        style: eleStyle,
        className: (child.props.className || '') + (index === currentIndex ? ' slide-active': '')
      })
    );
  });

  const slideButtons = new Array(
    Array.isArray(children) ? children.length : children ? 1 : 0
  )
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className={index === currentIndex ? "slide-active" : ""}
        onClick={() => handleActionBtClick(index)}
      >
        <button data-index={index} style={{ transitionDuration: (autoPlay ? delay : 0) + "ms" }}></button>
      </div>
    ));

  const boxStyle: CSSProperties = rect
    ? {
        transition: `all ${duration}s ${animate}`,
        position: "relative",
        left: rect ? `-${rect.width * currentIndex}px` : 0,
      }
    : {};

  return (
    <div className="container" ref={ref}>
      <div className="slide-box" style={boxStyle}>
        {childrenPage}
      </div>
      <div className="slide-buttons">{slideButtons}</div>
    </div>
  );
}
