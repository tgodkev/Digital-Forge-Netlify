import { gsap } from 'gsap';

import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { EaselPlugin } from 'gsap/EaselPlugin';

gsap.registerPlugin(Flip, ScrollTrigger, ScrollToPlugin, MotionPathPlugin, EaselPlugin);

export { gsap };
