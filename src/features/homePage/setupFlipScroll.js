let $ = window.$

import gsap from 'gsap'
import Flip from 'gsap/dist/Flip'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

// prettier-ignore
export default function setupFlipScroll() {
  // SETUP PLUGINS
  gsap.registerPlugin(ScrollTrigger, Flip);
  ScrollTrigger.normalizeScroll(true);
  // SETUP ELEMENTS
  let zoneEl = $("[js-scrollflip-element='zone']"),
    targetEl = $("[js-scrollflip-element='target']").first();
    console.log($("[js-scrollflip-element='target']"));



  // SETUP TIMELINE
  let tl;
  function createTimeline() {
    if (tl) {
      tl.kill();
      gsap.set(targetEl, { clearProps: "all" });
    }
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: zoneEl.first(),
        start: "center center",
        endTrigger: zoneEl.last(),
        end: "center center",
        scrub: true
      }
    });
    zoneEl.each(function (index) {
      let nextZoneEl = zoneEl.eq(index + 1);
      if (nextZoneEl.length) {
        let nextZoneDistance =
          nextZoneEl.offset().top + nextZoneEl.innerHeight() / 2;
        let thisZoneDistance = $(this).offset().top + $(this).innerHeight() / 2;
        let zoneDifference = nextZoneDistance - thisZoneDistance;
        tl.add(
          Flip.fit(targetEl[0], nextZoneEl[0], {
            duration: zoneDifference,
            ease: "power2.inOut",
            absolute: true,
          })

        );
      }
    });
  }
  createTimeline();
  // SETUP RESIZE
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      createTimeline();
    }, 250);
  });
}
