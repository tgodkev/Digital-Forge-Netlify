import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1ine71f_START -->${$$result.title = `<title>About</title>`, ""}<!-- HEAD_svelte-1ine71f_END -->`, ""} <h1 id="about" data-svelte-h="svelte-o5yk1x"><a aria-hidden="true" tabindex="-1" href="#about"><span class="icon icon-link"></span></a>About</h1> <p data-svelte-h="svelte-1w7xpjt">This is an example of how you can have <em>markdown</em> in page content!</p> <ul data-svelte-h="svelte-1bit751"><li>How</li> <li><strong>Cool</strong></li> <li>Is <em>that</em>!?</li></ul> <p data-svelte-h="svelte-3rxcmh">If you like, you can also import markdown into any Svelte page.</p> <p data-svelte-h="svelte-ue0pvh">Anyway, you can find this file here:</p> <pre class="language-undefined"><!-- HTML_TAG_START -->${`<code class="language-undefined">src/routes/about/+page.md</code>`}<!-- HTML_TAG_END --></pre> <p data-svelte-h="svelte-tlm40e">Here’s the <a href="/">home link</a> if you wanna go back.</p>`;
});
export {
  Page as default
};
