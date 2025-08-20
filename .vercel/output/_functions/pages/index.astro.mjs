import { c as createComponent, a as createAstro, b as addAttribute, r as renderScript, d as renderTemplate, e as defineScriptVars, u as unescapeHTML, f as renderComponent, g as renderHead, h as renderSlot, m as maybeRenderHead } from '../chunks/astro/server_ROhXo8pP.mjs';
import 'kleur/colors';
/* empty css                                 */
import '../chunks/index_DPYU2bcR.mjs';
import { $ as $$Font } from '../chunks/_astro_assets_CuMDVAln.mjs';
import 'clsx';
import { jsx } from 'react/jsx-runtime';
import { Warp } from '@paper-design/shaders-react';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/jhizgiaev/Projects/hizgiaev.dev/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/jhizgiaev/Projects/hizgiaev.dev/node_modules/astro/components/ClientRouter.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$LoadingIndicator = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LoadingIndicator;
  const {
    color,
    height = "2px",
    class: className = "astro-loading-indicator",
    animationDuration = 300,
    threshold: defaultThreshold = 200
  } = Astro2.props;
  const threshold = defaultThreshold === false ? 0 : defaultThreshold;
  const styles = `.${className} {
  pointer-events: none;
  background-color: ${color};
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height};
  transition: transform ${animationDuration}ms ease-out, opacity ${animationDuration / 2}ms ${animationDuration / 2}ms ease-in;
	transform: translate3d(0, 0, 0) scaleX(var(--progress, 0));
  transform-origin: 0;
}

[dir="rtl"] .${className} {
  transform-origin: 100% 0;
}
`;
  return renderTemplate(_a || (_a = __template(["<style>", "</style><script>(function(){", `
(() => {
  let progress = 0.25
  let opacity = 0
  /** @type {number | undefined} */
  let trickleInterval = undefined
  /** @type {number | undefined} */
  let thresholdTimeout = undefined;

  const element = document.createElement("div")
  element.classList.add(className)
  element.ariaHidden = "true"

  /** @param {typeof progress} _progress */
  const setProgress = (_progress) => {
    progress = _progress
    element.style.setProperty('--progress', String(progress))
  }

  /** @param {typeof opacity} _opacity */
  const setOpacity = (_opacity) => {
    opacity = _opacity
    element.style.setProperty('opacity', String(opacity))
  }

  setOpacity(opacity)

  document.addEventListener("DOMContentLoaded", () => {
    document.body.prepend(element)
  })

  document.addEventListener("astro:before-preparation", () => {
    thresholdTimeout = setTimeout(() => {
      setOpacity(1)
      trickleInterval = window.setInterval(() => {
        setProgress(progress + Math.random() * 0.03)
      }, animationDuration)
    }, threshold)
  })

  document.addEventListener("astro:before-swap", (ev) => {
    if (!thresholdTimeout) {
      return
    }
    window.clearTimeout(thresholdTimeout)

    ev.newDocument.body.prepend(element)
    window.clearInterval(trickleInterval)
    trickleInterval = undefined

    setProgress(1)
    window.setTimeout(() => {
      setOpacity(0)
    }, animationDuration / 2)

    window.setTimeout(() => {
      setProgress(0.25)
    }, animationDuration * 2)
  })
})()
})();<\/script>`])), unescapeHTML(styles), defineScriptVars({ className, animationDuration, threshold }));
}, "/Users/jhizgiaev/Projects/hizgiaev.dev/node_modules/astro-loading-indicator/src/LoadingIndicator.astro", void 0);

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { pageTitle, pageDescription } = Astro2.props;
  const defaultPageTitle = "Hizgiaev.dev";
  const defaultDescription = "Interested in quant, software engineering, research, venture capital, and private equity.";
  const title = pageTitle ?? defaultPageTitle;
  const description = pageDescription ?? defaultDescription;
  return renderTemplate`<html lang="en"> <head><!-- General --><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="shortcut icon" href="/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><meta name="apple-mobile-web-app-title" content="hizgiaev.dev"><link rel="manifest" href="/site.webmanifest"><title>${title}</title>${renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-geist", "preload": true })}${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderComponent($$result, "LoadingIndicator", $$LoadingIndicator, { "color": "#f4f4f5", "height": "2px" })}${renderHead()}</head> <body class="font-sans bg-zinc-900 min-h-screen"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/jhizgiaev/Projects/hizgiaev.dev/src/layouts/BaseLayout.astro", void 0);

const $$Availability = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex items-center gap-2 py-4"> <span class="relative flex items-center justify-center size-3"> <span class="absolute inline-flex h-full w-full animate-ping duration-1000 rounded-full bg-zinc-100 opacity-75"></span> <span class="relative inline-flex size-2 rounded-full bg-zinc-100"></span> </span> <p class="text-zinc-300">Looking for junior full time, winter, and summer internship opportunities!</p> </div>`;
}, "/Users/jhizgiaev/Projects/hizgiaev.dev/src/components/ui/Availability.astro", void 0);

function WarpBackground(props) {
  const defaultProps = {
    speed: 0.4,
    rotation: 0.5,
    style: { width: "100%", height: "100%" }
  };
  return /* @__PURE__ */ jsx(Warp, { ...defaultProps, ...props, style: { ...defaultProps.style, ...props.style } });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div class="group relative w-full min-h-dvh flex items-center justify-center"> <div class="absolute w-full h-dvh -z-10"> ${renderComponent($$result2, "WarpBackground", WarpBackground, { "color1": "#09090b", "color2": "#27272a", "color3": "#52525b", "speed": 0.6, "swirl": 0.5, "swirlIterations": 10, "shapeScale": 0.3, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jhizgiaev/Projects/hizgiaev.dev/src/components/ui/Warp", "client:component-export": "WarpBackground" })} </div> <div class="p-4 sm:p-8 absolute w-full h-dvh flex flex-col justify-between z-10"> <div> <h1 class="text-white text-8xl font-bold text-balance md:text-[120px] lg:text-[160px] tracking-tighter">Joshua <br> Hizgiaev</h1> </div> <div> ${renderComponent($$result2, "Availability", $$Availability, {})} <div class="mb-2 sm:mb-4 flex items-center justify-between"> <div class="flex items-center gap-4"> <a href="/" class="w-fit text-base sm:text-2xl px-5 py-2 rounded-full transition-all duration-300 ease-in-out whitespace-nowrap text-zinc-900 bg-zinc-100 hover:outline-2 outline-offset-2 outline-zinc-100 cursor-po">Contact me</a> <a href="/" class="w-fit text-base sm:text-2xl px-5 py-2 rounded-full transition-all duration-300 ease-in-out whitespace-nowrap text-zinc-100 hover:text-white bg-transparent hover:bg-zinc-100/20 hover:outline-2 outline-offset-2 outline-zinc-100/20">Recent news</a> </div> </div> </div> </div> </div> </main> ` })}`;
}, "/Users/jhizgiaev/Projects/hizgiaev.dev/src/pages/index.astro", void 0);

const $$file = "/Users/jhizgiaev/Projects/hizgiaev.dev/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
