import { c as create_ssr_component } from "./ssr.js";
const metadata = {
  "title": "Automatic heading links in mdsvex",
  "date": "2023-10-26",
  "updated": "2023-10-26",
  "categories": ["sveltekit", "markdown"],
  "coverImage": "/images/jefferson-santos-fCEJGBzAkrU-unsplash.jpg",
  "coverWidth": 16,
  "coverHeight": 9,
  "excerpt": "Check out how heading links work with this starter in this post."
};
const Heading_links_example = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p data-svelte-h="svelte-1leosmv">Here are some headings:</p> <h2 id="heres-an-h2" data-svelte-h="svelte-mtb1u1"><a aria-hidden="true" tabindex="-1" href="#heres-an-h2"><span class="icon icon-link"></span></a>Here’s an h2</h2> <p data-svelte-h="svelte-11asuyg">Lorem ipsum dolor sit amet</p> <h3 id="this-is-an-h3" data-svelte-h="svelte-m8uutk"><a aria-hidden="true" tabindex="-1" href="#this-is-an-h3"><span class="icon icon-link"></span></a>This is an h3</h3> <p data-svelte-h="svelte-11asuyg">Lorem ipsum dolor sit amet</p> <h4 id="as-youve-probably-guessed-this-is-an-h4" data-svelte-h="svelte-1b1nr1p"><a aria-hidden="true" tabindex="-1" href="#as-youve-probably-guessed-this-is-an-h4"><span class="icon icon-link"></span></a>As you’ve probably guessed, this is an h4</h4> <p data-svelte-h="svelte-11asuyg">Lorem ipsum dolor sit amet</p> <h5 id="this-of-course-is-an-h5" data-svelte-h="svelte-81cjw4"><a aria-hidden="true" tabindex="-1" href="#this-of-course-is-an-h5"><span class="icon icon-link"></span></a>This, of course, is an h5</h5> <p data-svelte-h="svelte-11asuyg">Lorem ipsum dolor sit amet</p> <h6 id="were-deep-in-h6-territory-now" data-svelte-h="svelte-rij70t"><a aria-hidden="true" tabindex="-1" href="#were-deep-in-h6-territory-now"><span class="icon icon-link"></span></a>We’re deep in h6 territory now</h6> <p data-svelte-h="svelte-11asuyg">Lorem ipsum dolor sit amet</p>`;
});
export {
  Heading_links_example as default,
  metadata
};
