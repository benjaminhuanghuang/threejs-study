import gsap from "gsap";

export const scrollAnimation = (position, target, isMobile, onUpdate) => {
  const timeline = gsap.timeline();

  timeline
    .to(position, {
      x: !isMobile ? -3.38 : -7.0,
      y: !isMobile ? -10.74 : -12.2,
      z: !isMobile ? -5.93 : -6.0,
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
    })
    .to(".sound-section-content", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    });
};
