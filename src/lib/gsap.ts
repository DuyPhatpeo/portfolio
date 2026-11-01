import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins once at module initialization (per greensock/gsap-skills)
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

// Prevent mobile address-bar show/hide from triggering redundant ScrollTrigger layout recalculations
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export { gsap, useGSAP, ScrollTrigger, ScrollToPlugin };
export default gsap;
