import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxTextProps {
  text: string;
  baseVelocity?: number;
  className?: string; // Por si quieres pasar clases personalizadas opcionales
  style?: React.CSSProperties
}

const ParallaxText: React.FC<ParallaxTextProps> = ({ text, baseVelocity = 100, className }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      <motion.div className="inline-flex" style={{ x }}>
        {[...Array(4)].map((_, index) => (
          <span key={index} className="text-2xl font-bold px-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ParallaxText;
