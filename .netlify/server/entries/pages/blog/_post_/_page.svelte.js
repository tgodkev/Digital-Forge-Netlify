import { c as create_ssr_component, e as escape, a as add_attribute, v as validate_component, b as each, m as missing_component } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { title, excerpt, date, updated, coverImage, coverWidth, coverHeight, categories } = data.meta;
  const { PostContent } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `  ${$$result.head += `<!-- HEAD_svelte-1apexcl_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<meta data-key="description" name="description"${add_attribute("content", excerpt, 0)}><meta property="og:type" content="article"><meta property="og:title"${add_attribute("content", title, 0)}><meta name="twitter:title"${add_attribute("content", title, 0)}><meta property="og:description"${add_attribute("content", excerpt, 0)}><meta name="twitter:description"${add_attribute("content", excerpt, 0)}><meta property="og:image:width"${add_attribute("content", coverWidth, 0)}><meta property="og:image:height"${add_attribute("content", coverHeight, 0)}><!-- HEAD_svelte-1apexcl_END -->`, ""} <article class="p-5 md:p-10"> <img class="cover-image"${add_attribute("src", coverImage, 0)} alt="" style="${"aspect-ratio: " + escape(coverWidth, true) + " / " + escape(coverHeight, true) + ";"}"${add_attribute("width", coverWidth, 0)}${add_attribute("height", coverHeight, 0)}> <h1>${escape(title)}</h1> <div class="meta"><b data-svelte-h="svelte-ssrxh0">Published:</b> ${escape(date)} <br> <b data-svelte-h="svelte-1uwawh">Updated:</b> ${escape(updated)}</div> ${validate_component(PostContent || missing_component, "svelte:component").$$render($$result, {}, {}, {})} ${categories ? `<aside class="pt-10"><h2 data-svelte-h="svelte-18w0g4i">Posted in:</h2> <ul class="flex gap-2">${each(categories, (category) => {
    return `<li class="bg-primary text-white text-lg py-1 px-2"><a href="${"/blog/category/" + escape(category, true) + "/"}">${escape(category)}</a> </li>`;
  })}</ul></aside>` : ``}</article>`;
});
export {
  Page as default
};
