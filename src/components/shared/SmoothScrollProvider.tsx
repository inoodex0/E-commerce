"use client";

import { ReactLenis } from "lenis/react";
import { type ReactNode } from "react";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 0.7,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.08,
        touchInertiaExponent: 1.5,
        touchMultiplier: 2.0,
        wheelMultiplier: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
