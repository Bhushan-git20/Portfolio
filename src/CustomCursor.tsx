"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";

const SPRING = {
  mass: 0.1, // Lower mass = snappier motion
  damping: 10, // Higher damping = less bouncy
  stiffness: 131, // Higher stiffness = snaps back faster
};

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // We use useSpring for the smooth trailing effect
  const xSpring = useSpring(-100, SPRING);
  const ySpring = useSpring(-100, SPRING);
  
  // Scale and opacity springs to handle enter/leave animations
  const opacitySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Center the 40px cursor (40/2 = 20)
      xSpring.set(e.clientX - 20);
      ySpring.set(e.clientY - 20);
      
      if (!isVisible) {
        setIsVisible(true);
        opacitySpring.set(1);
        scaleSpring.set(1);
      }
    };

    const handlePointerLeave = () => {
      opacitySpring.set(0);
      scaleSpring.set(0);
      setIsVisible(false);
    };

    const handlePointerEnter = () => {
      opacitySpring.set(1);
      scaleSpring.set(1);
      setIsVisible(true);
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
    };
  }, [isVisible, xSpring, ySpring, opacitySpring, scaleSpring]);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        x: xSpring,
        y: ySpring,
        opacity: opacitySpring,
        scale: scaleSpring,
      }}
    />
  );
};

export default CustomCursor;
