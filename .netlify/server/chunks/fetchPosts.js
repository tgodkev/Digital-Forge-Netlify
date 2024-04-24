import { p as postsPerPage } from "./config.js";
const fetchPosts = async ({ offset = 0, limit = postsPerPage, category = "" } = {}) => {
  const posts = await Promise.all(
    Object.entries(/* @__PURE__ */ Object.assign({ "/src/lib/posts/2024-04-09-a-new-test-for-me.md": () => import("./2024-04-09-a-new-test-for-me.js"), "/src/lib/posts/heading-links-example.md": () => import("./heading-links-example.js"), "/src/lib/posts/mdsvex-component-example.md": () => import("./mdsvex-component-example.js"), "/src/lib/posts/syntax-highlighting-example.md": () => import("./syntax-highlighting-example.js") })).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const slug = path.split("/").pop().slice(0, -3);
      return { ...metadata, slug };
    })
  );
  let sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (category) {
    sortedPosts = sortedPosts.filter((post) => post.categories.includes(category));
  }
  if (offset) {
    sortedPosts = sortedPosts.slice(offset);
  }
  if (limit && limit < sortedPosts.length && limit != -1) {
    sortedPosts = sortedPosts.slice(0, limit);
  }
  sortedPosts = sortedPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    coverWidth: post.coverWidth,
    coverHeight: post.coverHeight,
    date: post.date,
    categories: post.categories
  }));
  return {
    posts: sortedPosts
  };
};
export {
  fetchPosts as f
};
