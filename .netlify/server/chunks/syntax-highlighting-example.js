import { c as create_ssr_component } from "./ssr.js";
const metadata = {
  "title": "Syntax highlighting with mdsvex",
  "date": "2023-01-05",
  "updated": "2023-01-05",
  "categories": ["sveltekit", "web", "css", "markdown"],
  "coverImage": "/images/linus-nylund-Q5QspluNZmM-unsplash.jpg",
  "coverWidth": 16,
  "coverHeight": 9,
  "excerpt": "This post shows you how syntax highlighting works here."
};
const Syntax_highlighting_example = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p data-svelte-h="svelte-vtcwwv">mdsvex has automatic, built-in syntax highlighting with <a href="https://prismjs.com/" rel="nofollow">Prism.js</a>; just include the language name after the triple backticks, like so:</p> <pre class="language-undefined"><!-- HTML_TAG_START -->${`<code class="language-undefined">&#96;&#96;&#96;css
/* Your CSS here */
&#96;&#96;&#96;</code>`}<!-- HTML_TAG_END --></pre> <p data-svelte-h="svelte-1rcvqzl">And that will render just like so:</p> <pre class="language-css"><!-- HTML_TAG_START -->${`<code class="language-css"><span class="token selector">.my-css-class</span> <span class="token punctuation">&#123;</span>
	<span class="token property">color</span><span class="token punctuation">:</span> #ffd100<span class="token punctuation">;</span>
	<span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
	<span class="token comment">/* etc... */</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre> <p data-svelte-h="svelte-12xene8">Here’s how you’d do JavaScript:</p> <pre class="language-undefined"><!-- HTML_TAG_START -->${`<code class="language-undefined">&#96;&#96;&#96;js
// You can use js or javascript for the language
&#96;&#96;&#96;</code>`}<!-- HTML_TAG_END --></pre> <p data-svelte-h="svelte-bt4b12">Highlighted code sample:</p> <pre class="language-js"><!-- HTML_TAG_START -->${`<code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">invertNumberInRange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">num<span class="token punctuation">,</span> range</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">return</span> range <span class="token operator">-</span> num<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token function">invertNumberInRange</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 75</span></code>`}<!-- HTML_TAG_END --></pre> <p data-svelte-h="svelte-t0oiww">Of course, mdsvex supports Svelte highlighting, too:</p> <pre class="language-svelte"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> myComponent <span class="token keyword">from</span> <span class="token string">'$lib/components/myComponent.svelte'</span><span class="token punctuation">;</span>

	<span class="token keyword">export</span> <span class="token keyword">let</span> myProp <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyComponent</span> <span class="token attr-name">prop=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span>myProp<span class="token punctuation">&#125;</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre> <p data-svelte-h="svelte-1oo0ucu">All these colors are in <code>src/lib/assets/css/prism.css</code>, if you’d like to change them.</p>`;
});
export {
  Syntax_highlighting_example as default,
  metadata
};
