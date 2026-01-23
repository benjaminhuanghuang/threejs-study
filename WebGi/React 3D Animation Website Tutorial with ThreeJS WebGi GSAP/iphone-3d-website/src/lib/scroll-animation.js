import gsap from "gsap";

export const scrollAnimation = (position, target, onUpdate) => {
  const timeline = gsap.timeline();

  timeline
    .to(position, {
      x: -3.38,
      y: -10.75,
      z: 5.93,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
      onUpdate,
    })
    .to(target, {
      x: 1.52,
      y: 0.77,
      z: -1.08,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    })
    .to(".jumbotron-section", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    });
};
