'use client'

import React, {useRef, useEffect, useState} from "react"
import {motion, useInView, useAnimation} from "framer-motion"
import s from "./Reveal.module.css"

interface Props {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    duration?: number;
    layout?: boolean;
    className?: string;
    height?: string;
}

export const Reveal:React.FC<Props> = ({children, width = "100%", delay = 0.6, duration = 1,  layout, height}) => {
    const ref = useRef(null)
    const isInView = useInView(ref, {once: true, margin: "0px 0px -10px 0px"})

    const [style, setStyle] = useState("reveal-relative reveal-hidden")

    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.set("hidden")
            mainControls.start("visible")
            setTimeout(() => {
                setStyle("reveal-relative")
            }, 750)
        }
    }, [isInView, layout])

    return (
        <div ref={ref} style={{width, height}} className={`${s[style]}`}>
        <motion.div
        variants={{
            hidden: {opacity: 0, y: 10},
            visible: {opacity: 1, y: 0},
        }}
        initial="hidden"
        animate={mainControls}
        style={{width, height}}
        transition={{ duration, delay }}
        >{children}</motion.div>
        </div>
    )
};
