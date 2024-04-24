import { c as create_ssr_component, e as escape, a as add_attribute, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { a as Pagination, P as PostsList } from "../../../../../../../chunks/Pagination.js";
import { a as siteDescription, p as postsPerPage } from "../../../../../../../chunks/config.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lowerBound;
  let upperBound;
  let { data } = $$props;
  const { page, category, totalPosts, posts } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  lowerBound = page * postsPerPage - (postsPerPage - 1) || 1;
  upperBound = Math.min(page * postsPerPage, totalPosts);
  return `  ${$$result.head += `<!-- HEAD_svelte-18pkd8t_START -->${$$result.title = `<title>Blog category ${escape(category)} - page ${escape(page)}</title>`, ""}<meta data-key="description"${add_attribute("name", siteDescription, 0)}><!-- HEAD_svelte-18pkd8t_END -->`, ""}  ${posts && posts.length ? `<h1>Category: ${escape(category)} <br> <small>Posts ${escape(lowerBound)}–${escape(upperBound)} of ${escape(totalPosts)}</small></h1> ${validate_component(Pagination, "Pagination").$$render(
    $$result,
    {
      currentPage: page,
      totalPosts,
      path: "/blog/category/" + category + "/page"
    },
    {},
    {}
  )} ${validate_component(PostsList, "PostsList").$$render($$result, { posts }, {}, {})} ${validate_component(Pagination, "Pagination").$$render(
    $$result,
    {
      currentPage: page,
      totalPosts,
      path: "/blog/category/" + category + "/page"
    },
    {},
    {}
  )}` : `<h1 data-svelte-h="svelte-1u3vn74">Oops!</h1> <p data-svelte-h="svelte-gl524b">Sorry, no posts to show here.</p> <a href="/blog" data-svelte-h="svelte-1qcn6gf">Back to blog</a>`}`;
});
export {
  Page as default
};
