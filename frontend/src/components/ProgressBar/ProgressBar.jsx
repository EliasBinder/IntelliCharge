import "./ProgressBar.css"
import {motion, animate} from 'framer-motion';
import { useEffect, useRef } from "react";

export default function ProgressBar({value}) {
    const progressTextRef = useRef(null);
    useEffect(() => {
        const progressText = progressTextRef.current?.textContent;
        if(progressText && progressTextRef.current) {
            animate(parseInt(progressText),value, {
                duration: 2,
                onUpdate : (cv) => {
                    if(progressTextRef.current) 
                        progressTextRef.current.textContent = cv.toFixed(0)
                }
            });
        }
    }, [value]);
    return(
        <div className="progressbar-container">
            <div className="progressbar">
                <motion.div 
                    className="bar"
                    animate={{
                        width: `${value}%`
                    }}
                    transition={{
                        duration: 3
                    }}
                />
            </div>
            <div className="progressbar-text-container">
                <p ref={progressTextRef}>0</p>
                <p>%</p>
            </div>
        </div>
    );
}