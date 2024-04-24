import { c as create_ssr_component, e as escape, v as validate_component } from "../../../../../chunks/ssr.js";
import { P as PostsList, a as Pagination } from "../../../../../chunks/Pagination.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { page, posts, category, total } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `  ${$$result.head += `<!-- HEAD_svelte-2blklu_START -->${$$result.title = `<title>Category: ${escape(category)}</title>`, ""}<!-- HEAD_svelte-2blklu_END -->`, ""} <h1>Blog category: ${escape(category)}</h1> ${posts.length ? `${validate_component(PostsList, "PostsList").$$render($$result, { posts }, {}, {})} ${validate_component(Pagination, "Pagination").$$render(
    $$result,
    {
      currentPage: page,
      totalPosts: total,
      path: "/blog/category/" + category + "/page"
    },
    {},
    {}
  )}` : `<p><strong data-svelte-h="svelte-4xjsnl">Ope!</strong> Sorry, couldn&#39;t find any posts in the category &quot;${escape(category)}&quot;.</p> <p data-svelte-h="svelte-79gs32"><a href="/blog">Back to blog</a></p>`}`;
});
export {
  Page as default
};
