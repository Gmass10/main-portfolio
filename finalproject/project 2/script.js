document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") return;
  const tl = gsap.timeline({ delay: 0.3 });

  // -------- "I CRAFT" LETTER POP --------
  const craft = document.querySelector(".bold");
  if (craft) {
    const letters = craft.textContent.split("");
    craft.innerHTML = letters.map(l => `<span>${l}</span>`).join("");
    tl.from(".bold span", {
      opacity: 0,
      y: 40,
      scale: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)",
      duration: 0.5
    });
  }
    // ---- Projects Snap Glide (wheel + keyboard) ----
    (() => {
      const viewport = document.getElementById('projectsViewport');
      if (!viewport) return;

      const getCardWidth = () => {
        const first = viewport.querySelector('.card');
        if (!first) return viewport.clientWidth;
        const style = getComputedStyle(viewport);
        const gap = parseFloat(style.columnGap || style.gap || 0);
        return first.getBoundingClientRect().width + gap;
      };

      let anim = null;
      const snapToIndex = (index) => {
        const cardW = getCardWidth();
        const maxIndex = Math.max(0, viewport.querySelectorAll('.card').length - 1);
        const clamped = Math.max(0, Math.min(index, maxIndex));
        const target = Math.round(clamped) * cardW;
        if (anim) anim.kill();
        anim = gsap.to(viewport, {
          scrollLeft: target,
          duration: 0.65,
          ease: 'power3.out'
        });
      };

      const currentIndex = () => {
        const cardW = getCardWidth();
        return Math.round(viewport.scrollLeft / cardW);
      };

      const wheelHandler = (e) => {
        // Only intercept horizontal carousel wheel, let normal page scroll work
        const dy = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (dy === 0) return;
        e.preventDefault();
        const dir = dy > 0 ? 1 : -1;
        snapToIndex(currentIndex() + dir);
      };

      const keyHandler = (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          snapToIndex(currentIndex() + 1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          snapToIndex(currentIndex() - 1);
        }
      };

      viewport.addEventListener('wheel', wheelHandler, { passive: false });
      viewport.addEventListener('keydown', keyHandler);

      // Resize handling to maintain precise snapping
      window.addEventListener('resize', () => snapToIndex(currentIndex()));
    })();


  // -------- RED IMAGE --------
  tl.from(".img-red", {
    opacity: 0,
    scale: 0,
    rotate: -10,
    borderWidth: 0, // animate border together
    ease: "back.out(1.7)",
    duration: 0.5
  }, "-=0.2");

  // -------- "THE NEXT GEN" OVERLAY --------
  const nextGenOverlay = document.querySelector(".nextgen-wrap .overlay");
  const nextGenText = document.querySelector(".outlined.nextgen");
  if (nextGenOverlay && nextGenText) {
    gsap.set(nextGenText, { opacity: 1 });
    tl.to(nextGenOverlay, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.2");
  }

  // -------- "DIGITAL EXPERIENCES" LETTER POP --------
  const digital = document.querySelector(".bold2");
  if (digital) {
    const letters = digital.textContent.split("");
    digital.innerHTML = letters.map(l => `<span>${l}</span>`).join("");
    tl.from(".bold2 span", {
      opacity: 0,
      y: 40,
      scale: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)",
      duration: 0.5
    });
  }

  // -------- GRAY IMAGE --------
  tl.from(".img-gray", {
    opacity: 0,
    scale: 0,
    rotate: -10,
    borderWidth: 0,
    ease: "back.out(1.7)",
    duration: 0.5
  }, "-=0.3");

  // -------- "WITH" LETTER POP --------
  const withText = document.querySelector(".with");
  if (withText) {
    const withWord = withText.childNodes[0]; // "WITH "
    withText.innerHTML = `<span class="with-word">${withWord.textContent}</span>` + withText.innerHTML.replace(withWord.textContent, "");
    tl.from(".with-word", {
      opacity: 0,
      y: 40,
      scale: 0.8,
      ease: "back.out(1.7)",
      duration: 0.5
    });
  }

  // -------- WHITE IMAGE --------
  tl.from(".img-white", {
    opacity: 0,
    scale: 0,
    rotate: -10,
    borderWidth: 0,
    ease: "back.out(1.7)",
    duration: 0.5
  }, "-=0.3");

  // -------- "PASSION" LETTER POP --------
  const passion = document.querySelector(".bold.underline");
  if (passion) {
    const letters = passion.textContent.split("");
    passion.innerHTML = letters.map(l => `<span>${l}</span>`).join("");
    tl.from(".bold.underline span", {
      opacity: 0,
      y: 40,
      scale: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)",
      duration: 0.5
    });
  // -------- UNDERLINE DRAW via class toggle (can't target ::after directly) --------
  tl.add(() => passion.classList.add("show-underline"));
  }
});

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".banner").forEach((banner, i) => {
  const letters = banner.querySelectorAll(".split span");
  const img = banner.querySelector(".img-mask");
  const info = banner.querySelector(".in");

  // letter pop-in
  ScrollTrigger.create({
    trigger: banner,
    start: `top+=${i * 25 - 250} top`,
    end: `top+=${i * 25 - 100} top`,
    scrub: 1,
    animation: gsap.fromTo(letters, { opacity: 0, y: "30%" }, { opacity: 1, y: "0%", stagger: 0.50, ease: "none" })
  });

  // image reveal
  ScrollTrigger.create({
    trigger: banner,
    start: "top bottom",
    end: "top top",
    scrub: 0.5,
    animation: gsap.fromTo(img, {
      clipPath: "polygon(25% 25%, 75% 40%,100% 100%,0% 100%)"
    }, {
      clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
      ease: "none"
    })
  });

  // image exit morph
  ScrollTrigger.create({
    trigger: banner,
    start: "bottom bottom",
    end: "bottom top",
    scrub: 0.5,
    animation: gsap.fromTo(img, {
      clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)"
    }, {
      clipPath: "polygon(0% 0%,100% 0%,75% 60%,25% 75%)",
      ease: "none"
    })
  });
  // fade info in/out
  ScrollTrigger.create({
    trigger: banner,
    start: "top center",
    onEnter: () => gsap.to(info, { opacity: 1, duration: 0.5 }),
    onLeaveBack: () => gsap.to(info, { opacity: 0, duration: 0.5 }),
  });
});


const cards = document.querySelectorAll('.card');
const stackSection = document.querySelector('#myStack');

window.addEventListener('scroll', () => {
  const sectionTop = stackSection.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.8;

  if (sectionTop < triggerPoint) {
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('active');
      }, i * 150);
    });
  } else {
    cards.forEach(card => card.classList.remove('active'));
  }
});

const thanksText = document.getElementById("thanksText");
const beHereText = document.getElementById("beHereText");
const imageWrapper = document.getElementById("imageWrapper");
const images = imageWrapper.querySelectorAll(".center-img");
const aboutWords = document.getElementById("aboutWords");
const lastImage = document.getElementById("lastImage");

// Split about paragraph into word spans while preserving <br>
if (aboutWords) {
  const nodes = Array.from(aboutWords.childNodes);
  const rebuilt = [];
  nodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'BR') {
      rebuilt.push('<br>');
    } else {
      const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
      if (!text) return;
      const parts = text.split(' ');
      parts.forEach((w, i) => {
        rebuilt.push(`<span>${w}</span>${i < parts.length - 1 ? ' ' : ''}`);
      });
    }
  });
  aboutWords.innerHTML = rebuilt.join('');
}
const wordSpans = aboutWords ? aboutWords.querySelectorAll('span') : [];

// GSAP timeline
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({
  scrollTrigger: {
  trigger:".hero",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

// 1. Thanks To slide in
tl.from([thanksText, beHereText], {
  y: 50, 
  opacity: 0, 
  duration: 0.8, 
  ease: "power3.out", 
});
tl.to(thanksText, { x:-120, opacity:1, duration:0.8, ease:"power3.out" });
tl.to(beHereText, { x:250, opacity:1, duration:0.8, ease:"power3.out" },"<");

// 3. Image wrapper scales in
tl.to(images, { scale:1, opacity:1, duration:0.8, stagger:0.2, ease:"back.out(1.7)" }, "+=0.3");

// 4. Fade out texts
tl.to([thanksText, beHereText], { opacity:0, duration:0.5, delay:0.5 });
// 6. About paragraph word-by-word
tl.to(wordSpans, {
  opacity:1,
  duration:0.5,
  stagger: { amount:1, from:"random" },
  ease:"power3.inOut",
},"<");

// 5. Move image wrapper to bottom-right corner and shrink
tl.to(imageWrapper, {
  x: window.innerWidth/2 - 200,
  y: window.innerHeight/2 - 200,
  scale:0.5,
  duration:1,
  ease:"power3.inOut"
});


// 7. Last emoji pops
tl.to(lastImage,
   {
    opacity:1,
     scale:1,
      rotate:360, 
      duration:0.8, 
      ease:"back.out(1.7)" 
    }, "-=0.5");



