import { c as create_ssr_component, b as each, e as escape } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { uniqueCategories } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-si9hjk_START -->${$$result.title = `<title>Blog | Categories</title>`, ""}<!-- HEAD_svelte-si9hjk_END -->`, ""} <div class="compressed-content"><h1 class="h2" data-svelte-h="svelte-fvonwu">All blog categories</h1> <ul>${each(uniqueCategories, (category) => {
    return `<li><a href="${"/blog/category/" + escape(category.title, true)}">${escape(category.title)}</a>
			(${escape(category.count)})
		</li>`;
  })}</ul></div>`;
});
export {
  Page as default
};
