import { motion } from "motion/react";
import frame from "../assets/splash_frame.svg";
import { cubicBezier } from "motion";
import SplashButton from "./Splash/SplashButton";

import YoutubeIcon from '../assets/youtube.svg?raw';
import BlueskyIcon from '../assets/bsky.svg?raw';
import DiscordIcon from '../assets/discord.svg?raw';
import GithubIcon from '../assets/github.svg?raw';

const getRandomDelay = (): number => Math.random() * 3 + 0.5; // Random delay between 0.5 and 3.5 seconds

const SplashComponent: React.FC = () => {

  const bobTransition = {
    duration: 25,
    repeat: Infinity,
    ease: "linear", // Smooth ease out at the start and end
  };

  const bobAmount = 10;
  const blframing = {
    x: [0, bobAmount, 0, -bobAmount, 0],
    y: [0, -bobAmount, 0, bobAmount, 0]
  }
  const trframing = {
    x: [0, bobAmount, 0, -bobAmount, 0],
    y: [0, -bobAmount, 0, bobAmount, 0]
  }

  return (
    <div className="splash splash-drop-shadow" style={{opacity:"90%"}}>
      <motion.img
        src={frame.src}
        className="splash-bottom-left-framing splash-framing"
        animate={blframing}
        transition={bobTransition}
      />
      <motion.img
        src={frame.src}
        className="splash-top-right-framing splash-framing"
        animate={trframing}
        transition={bobTransition}
      />
      <motion.div className="splash-content">
        <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.44 23.65" width="300px" style={{
          color: "#fff",
          stroke: "#fff",
          strokeLinecap: "round",
          fill: "none",
          translate: "15px"
        }}>
          <motion.path 
            d="M2.57,1.15c2.33,2.3,4.01,3.99,5.7,6.2,1.92,2.51,3.76,5.11,5.13,7.93"
            strokeLinecap="round"
            initial={{ pathLength: 0.001, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 100 }}
            transition={{ 
              duration: 0.1, ease: "circOut" 
            }}
          />
          <motion.path 
            d="M11.74.5c-2.2,4.19-4.56,8.37-7.09,12.52-.02.03-.13.25-.32.52-.47.67-1.68,2.6-3.25,1.94-.54-.23-.81-1.13-.34-1.93.5-.86,1.74-1,2.55-.79.5.14.98.76,2.1,1.55,0,0,1.06.9,3,1.08,3.72.36,7.18-.34,9.66-3.57,2.71-3.52.44-3.59.35-3.58-.68.05-1.52.72-2.14,1.78-1.06,1.79-.87,4.46.42,4.89.96.32,2.37-1.06,2.92-1.6.93-.91,1.34-1.55,1.34-1.55.35-.55.58-.74.86-1.16.8-1.19,1.28-1.83,1.6-1.58.8.62-.95,5.15-.92,5.17.08.03.52-1.79,1.2-3.28.44-.97,1.43-1.5,2.06-1.28.72.25.58,2,.33,3.28-.12.6-.02,1.67,1.07,1.65,1.85-.04,2.02-1.25,2.62-2.08,0,0,.68-.94,1.69-1.53,1.21-.71,2.54-.66,3.38-.52-.39-.01-3.92-.08-4.98,1.9-.13.24-.61,1.13-.23,1.83.23.43.74.64,1.13.73,2.92.66,3.87-3.72,4.44-5.53,1.22-3.85,1.13-5.98,1.15-6.57,0-.03-.62.48-.96,2.82-1.35,9.18,0,8.73.78,9.22.1.06.93.03,1.3-.2,2.18-1.36,2.92-5.82,2.89-5.67-.01.07-1.52,2.96-1,4.13.19.42.63.87,1.12.93,1.81.24,3.58-4.77,3.92-4.63.33.14-1.31,4.91-4.16,10.08-1.48,2.69-2.36,3.79-3.23,3.68-.79-.1-1.45-1.18-1.5-2.14-.11-1.99,2.41-3.49,3.07-3.88,2.89-1.71,4.27-.5,8.97-2.15,2.49-.87,3.74-1.79,4.17-3.04.2-.59.35-1.59-.03-1.81-.37-.22-1.13.36-1.49.72-.52.53-.61,1.2-.71,1.18-.12-.03.22-.99-.09-1.2-.33-.23-1.48.42-1.84,1.35-.52,1.32.65,2.93,1.09,3.4,2.97,3.14,13.84-2.53,15.31-3.31"
            initial={{ pathLength: 0.02, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 100 }}
            transition={{ 
              duration: 5, ease: cubicBezier(.4,0.7,0,1), delay: 0.1
            }}
          />
        
        </motion.svg>
        <motion.div style={{
          width: "300px",
          height: "2px",
          borderRadius:"999999px",
          backgroundColor: "#ffadcf",
          y: "-30px"
        }}></motion.div>
        <motion.div style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          top: "-30px",
          position: "relative",
          height: "75px",
          overflowY: "hidden"
        }}>
          <motion.div style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            opacity: "90%"
          }}
          initial={{y:"-70px"}}
          animate={{y:"10px"}}
          transition={{
            duration: 3,
            ease: cubicBezier(0, 0.6, .25, 1)
          }}
          >
            <SplashButton name="YouTube" url="https://www.youtube.com/@XendyOS" primary="#ffd9e0" selection="#ff8ca3" icon={YoutubeIcon} iconNormal="#cc6076" iconSelected="#ffffff" viewbox="0 0 32 32"/>
            <SplashButton name="Bluesky" url="https://bsky.app/profile/xendyos.bsky.social" primary="#e6f2ff" selection="#8cc4ff" icon={BlueskyIcon} iconNormal="#7090b3" iconSelected="#FFFFFF" viewbox="0 0 600 440"/>
            <SplashButton name="Discord" url="https://discord.com/users/924157279761203210" primary="#d1d1ed" selection="#abb0ed" icon={DiscordIcon} iconNormal="#7878e3" iconSelected="#FFFFFF" viewbox="0 -28.5 256 256"/>
            <SplashButton name="Github" url="https://github.com/XendyExe" primary="white" selection="#969696" icon={GithubIcon} iconNormal="#6b6b6b" iconSelected="#FFFFFF" viewbox="0 0 16 16"/>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashComponent;
