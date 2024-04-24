import { j as json } from "../../../../../chunks/index.js";
const prerender = true;
const GET = () => {
  const posts = /* @__PURE__ */ Object.assign({ "/src/lib/posts/2024-04-09-a-new-test-for-me.md": () => import("../../../../../chunks/2024-04-09-a-new-test-for-me.js"), "/src/lib/posts/heading-links-example.md": () => import("../../../../../chunks/heading-links-example.js"), "/src/lib/posts/mdsvex-component-example.md": () => import("../../../../../chunks/mdsvex-component-example.js"), "/src/lib/posts/syntax-highlighting-example.md": () => import("../../../../../chunks/syntax-highlighting-example.js") });
  return json(Object.keys(posts).length);
};
export {
  GET,
  prerender
};
