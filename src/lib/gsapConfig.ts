import { gsap } from 'gsap/dist/gsap';

import { CustomEase } from 'gsap/dist/CustomEase';
import { RoughEase, ExpoScaleEase, SlowMo } from 'gsap/dist/EasePack';

import { Flip } from 'gsap/dist/Flip';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Observer } from 'gsap/dist/Observer';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { Draggable } from 'gsap/dist/Draggable';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { EaselPlugin } from 'gsap/dist/EaselPlugin';
import { PixiPlugin } from 'gsap/dist/PixiPlugin';
import { TextPlugin } from 'gsap/dist/TextPlugin';

gsap.registerPlugin(
	Flip,
	ScrollTrigger,
	Observer,
	ScrollToPlugin,
	Draggable,
	MotionPathPlugin,
	EaselPlugin,
	PixiPlugin,
	TextPlugin,
	RoughEase,
	ExpoScaleEase,
	SlowMo,
	CustomEase
);
export { gsap };
