"use client";

import { useEffect } from "react";

/**
 * Drives the experiences carousel on the Escocia page.
 *
 * Reproduces `carrusel-experiencias.js`. The slides, arrows and dot container
 * come from the ported markup; this supplies the behaviour and builds the dots,
 * which the source creates in script.
 *
 * The track's last slide is a clone of the first, so forward wrapping is
 * seamless: on reaching it the position snaps back to 0 without a transition.
 *
 * Autoplay is 3s and pauses on hover, focus, touch, hidden tab, or reduced
 * motion — all kept from the source.
 */
export default function ExperiencesCarousel() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-rela-carousel]");
    if (!root) return;
    const track = root.querySelector<HTMLElement>("[data-rela-track]");
    const dotsContainer = root.querySelector<HTMLElement>("[data-rela-dots]");
    const previous = root.querySelector<HTMLElement>("[data-rela-prev]");
    const next = root.querySelector<HTMLElement>("[data-rela-next]");
    const viewport = root.querySelector<HTMLElement>(".rela-carousel-window");
    if (!track || !dotsContainer || !previous || !next || !viewport) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const total = slides.length - 1; // the last slide is the wrap clone
    if (total < 1) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    let hovering = false;
    let focused = false;
    let swiping = false;
    let startX = 0;
    let lastX = 0;

    const modulo = (value: number) => ((value % total) + total) % total;

    const render = (animate: boolean) => {
      track.style.transition =
        animate && !reduceMotion.matches
          ? "transform 600ms cubic-bezier(.3,.05,.22,1)"
          : "none";
      track.style.transform = `translate3d(${-current * 100}%,0,0)`;
      const active = modulo(current);
      dots.forEach((dot, index) =>
        dot.setAttribute("aria-current", String(index === active))
      );
      slides.forEach((slide, index) =>
        slide.setAttribute("aria-hidden", String(index !== current))
      );
    };

    const goTo = (target: number) => {
      if (current === total) {
        current = 0;
        render(false);
        void track.offsetWidth; // force reflow so the next move animates
      }
      current = target;
      render(true);
    };

    const forward = () => goTo(current >= total ? 1 : current + 1);
    const backward = () => goTo(modulo(current - 1));

    const pause = () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    };
    const resume = () => {
      pause();
      if (reduceMotion.matches || hovering || focused || document.hidden || swiping) {
        return;
      }
      timer = setInterval(forward, 3000);
    };
    const restart = () => {
      pause();
      resume();
    };

    const dots: HTMLButtonElement[] = [];
    for (let index = 0; index < total; index += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "rela-carousel-dot";
      dot.setAttribute("aria-label", `Ver fotografía ${index + 1} de ${total}`);
      dot.addEventListener("click", () => {
        goTo(index);
        restart();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== "transform" || current !== total) return;
      current = 0;
      render(false);
    };
    const onPrev = () => {
      backward();
      restart();
    };
    const onNext = () => {
      forward();
      restart();
    };
    const onEnter = () => {
      hovering = true;
      pause();
    };
    const onLeave = () => {
      hovering = false;
      resume();
    };
    const onFocusIn = () => {
      focused = true;
      pause();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!root.contains(event.relatedTarget as Node | null)) {
        focused = false;
        resume();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    };
    const onTouchStart = (event: TouchEvent) => {
      if (!event.touches.length) return;
      swiping = true;
      startX = lastX = event.touches[0].clientX;
      pause();
    };
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length) lastX = event.touches[0].clientX;
    };
    const onTouchEnd = () => {
      const distance = lastX - startX;
      swiping = false;
      if (Math.abs(distance) > 45) {
        if (distance < 0) forward();
        else backward();
      }
      restart();
    };
    const onTouchCancel = () => {
      swiping = false;
      resume();
    };
    const onMotionChange = () => {
      render(false);
      resume();
    };

    track.addEventListener("transitionend", onTransitionEnd);
    previous.addEventListener("click", onPrev);
    next.addEventListener("click", onNext);
    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    root.addEventListener("keydown", onKeyDown);
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: true });
    viewport.addEventListener("touchend", onTouchEnd, { passive: true });
    viewport.addEventListener("touchcancel", onTouchCancel, { passive: true });
    document.addEventListener("visibilitychange", resume);
    reduceMotion.addEventListener("change", onMotionChange);

    render(false);
    resume();

    return () => {
      pause();
      track.removeEventListener("transitionend", onTransitionEnd);
      previous.removeEventListener("click", onPrev);
      next.removeEventListener("click", onNext);
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      root.removeEventListener("keydown", onKeyDown);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("touchcancel", onTouchCancel);
      document.removeEventListener("visibilitychange", resume);
      reduceMotion.removeEventListener("change", onMotionChange);
      dots.forEach((dot) => dot.remove());
    };
  }, []);

  return null;
}
