import { motion, type EventInfo } from "motion/react";
import { useState } from "react";

interface SplashButtonProps {
    url: string;
  name: string;
  primary: string;
  selection: string;
  iconNormal: string;
  iconSelected: string;
  icon: string; // just the <path> as a string
  viewbox: string;
}

const SplashButton: React.FC<SplashButtonProps> = (props) => {
  const sizePx = 60;
  const sizeIcon = 0.85;
  const sizeIcon2 = 0.86;
  const iconCenter = (1 - sizeIcon)/2;
  const iconCenter2 = (1 - sizeIcon2)/2;
  const size = `${sizePx}px`;
  const [y, setY] = useState(sizePx);

  const hoverStart = (event: MouseEvent, info: EventInfo) => {
    setY(0);
  };
  const onHoverEnd = (event: MouseEvent, info: EventInfo) => {
    setY(sizePx);
  };

  return (
    <a href={props.url} target="_blank" rel="noopener noreferrer" aria-label={props.name}>
            <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: props.primary,
        overflow: "hidden",
        position: "relative",
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2, type: "" },
      }}
      onHoverStart={hoverStart}
      onHoverEnd={onHoverEnd}
    >
      <motion.div
        style={{
          width: `${sizePx+5}px`,
          height: `${sizePx+5}px`,
          backgroundColor: props.selection,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          y: sizePx
        }}
        animate={{ y }}
        transition={{ type: "easeInOut", duration: 0.2 }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          zIndex: 2,
          clipPath: `inset(${sizePx}px 0px 0px 0px)`
        }}
        animate={{
          clipPath: `inset(${y}px 0px 0px 0px)`,
        }}
        transition={{ type: "easeInOut", duration: 0.2 }}
      >
        <svg
          width={`${sizePx * sizeIcon2}px`}
          height={`${sizePx * sizeIcon2}px`}
          viewBox={props.viewbox}
          xmlns="http://www.w3.org/2000/svg"
          fill={props.iconSelected}
          style={{transform: `translate(${sizePx*iconCenter2}px,${sizePx*iconCenter2}px)`}}
        >
          <g dangerouslySetInnerHTML={{ __html: props.icon }} />
        </svg>
      </motion.div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          zIndex: 1,
        }}
      >
        <svg
          width={`${sizePx * sizeIcon}px`}
          height={`${sizePx * sizeIcon}px`}
          viewBox={props.viewbox}
          xmlns="http://www.w3.org/2000/svg"
          fill={props.iconNormal}
          style={{transform: `translate(${sizePx*iconCenter}px,${sizePx*iconCenter}px)`}}
        >
          <g dangerouslySetInnerHTML={{ __html: props.icon }} />
        </svg>
      </div>
    </motion.div>
    </a>
  );
};

export default SplashButton;
