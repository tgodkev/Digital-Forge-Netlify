import { c as create_ssr_component, a as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { P as PostsList, a as Pagination } from "../../../chunks/Pagination.js";
import { a as siteDescription } from "../../../chunks/config.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1t9o4xr_START -->${$$result.title = `<title>Blog</title>`, ""}<meta data-key="description" name="description"${add_attribute("content", siteDescription, 0)}><!-- HEAD_svelte-1t9o4xr_END -->`, ""} <h1 data-svelte-h="svelte-dbxyy8">Blog</h1> <div class="p-5 md:p-44">${validate_component(PostsList, "PostsList").$$render($$result, { posts: data.posts }, {}, {})}</div> ${validate_component(Pagination, "Pagination").$$render($$result, { currentPage: 1, totalPosts: data.total }, {}, {})}`;
});
export {
  Page as default
};
