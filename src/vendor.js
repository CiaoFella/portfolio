import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'
import { Flip } from 'gsap/Flip'
import SplitType from 'split-type'
import barba from '@barba/core'
import { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } from 'matter-js'
import Lenis from '@studio-freight/lenis'
import axios from 'axios'
import JustValidate from 'just-validate'
import { gtag } from 'ga-gtag'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Flip)

export {
  gsap,
  ScrollTrigger,
  Flip,
  SplitType,
  barba,
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
  Body,
  Lenis,
  axios,
  JustValidate,
  gtag,
}
