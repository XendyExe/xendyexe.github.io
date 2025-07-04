import { motion, type EventInfo } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { animate, scroll } from "motion";

interface StarsProps {
    starDensity: number,
    parallax: number,
    size: number,
    opacity: string
}

const Stars: React.FC<StarsProps> = (props) => {
    const width = 2000;
    const height = 2000 + props.parallax;
    const starSizeMult = props.size;
    const color = "white";
    const starCount = width * height * props.starDensity;
    if (starCount > 10000) throw "Star count is over 10000! Are you sure you want to render this??";
    
    const starData = []
    for (let i = 0; i < starCount; i++) {
        starData.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * starSizeMult + 0.01
        })
    }

    const selfClass = `star-selector-${Math.floor(Math.random()*100000)}`
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        console.log("applying star parallax !")
        const stars = svgRef.current;
        const parallaxValue = props.parallax;

        const anim = animate(stars!, { transform: [`translate(0px, 0px)`, `translate(0px, ${-parallaxValue}px)`] },{ ease: "linear" });
        scroll(anim);
        containerRef.current!.style.opacity = "100%";
    }, [svgRef.current]);
    return <motion.div style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        opacity: "0",
        transition: "opacity 2s linear"
    }} ref={containerRef}><motion.svg ref={svgRef}className={selfClass} width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{width: "100vw", opacity: props.opacity, height: "auto", minWidth: `${width}px`}}>
    {
        ...starData.map((star, index)=><circle
                key={index}
                cx={star.x}
                cy={star.y}
                r={star.r}
                fill={color}/>)
    }
</motion.svg></motion.div>
}

export default Stars