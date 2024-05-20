import { c as create_ssr_component, e as escape, a as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { G as GuyOne, a as GirlOne, P as PricingCard, F as Faqs, b as GuyTwo } from "../../../chunks/Faqs.js";
import { a as siteDescription, s as siteTitle } from "../../../chunks/config.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-n76hpb_START -->${$$result.title = `<title>${escape(siteTitle)}</title>`, ""}<meta data-key="description" name="description"${add_attribute("content", siteDescription, 0)}><meta property="og:type" content="article"><meta property="og:title"${add_attribute("content", siteTitle, 0)}><meta name="twitter:title"${add_attribute("content", siteTitle, 0)}><meta property="og:description"${add_attribute("content", siteDescription, 0)}><meta name="twitter:description"${add_attribute("content", siteDescription, 0)}><!-- HEAD_svelte-n76hpb_END -->`, ""} <section class="relative"><div class="bg-primary lg:p-10 md:grid md:grid-cols-2"><div class="p-5 bg-white rounded-lg place-self-center w-fit"><h1 class="text-2xl md:text-5xl">${escape(siteTitle)}</h1> <p class="max-w-prose" data-svelte-h="svelte-9v2p25">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur exercitationem sint quia
				incidunt nulla recusandae? Blanditiis nam omnis, hic accusantium voluptas in non eos odit
				tempore odio autem ex expedita.</p></div> <div class="place-self-center" data-svelte-h="svelte-14ez2kq">[Video will go here]</div></div> <img src="/images/tri1.svg" alt="" class="relative -top-[1px]"></section> <section class="lg:grid lg:grid-cols-3 lg:py-10"><div class="place-self-center" data-svelte-h="svelte-2ptniz"><h2 class="lg:text-2xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h2> <p class="max-w-prose">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ipsa ratione, illo, quod quia
			dolorem, sapiente blanditiis cum accusamus soluta illum libero ad temporibus alias explicabo
			veritatis repellat deleniti voluptatibus.</p></div> <div class="flex justify-center w-full h-full rounded-md lg:col-span-2 bg-primary">${validate_component(GuyOne, "GuyOne").$$render($$result, {}, {}, {})}</div></section> <section class="lg:grid lg:grid-cols-2 bg-primary lg:p-5"><div class="flex justify-center">${validate_component(GirlOne, "GirlOne").$$render($$result, {}, {}, {})}</div> <div class="flex flex-col items-center w-full bg-white rounded-md place-self-center lg:p-10" data-svelte-h="svelte-1820agg"><h2>Lorem Ipsum</h2> <ul class="flex gap-5"><li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li></ul></div></section> <section class="grid gap-5 p-5 lg:p-10 lg:grid-cols-3 lg:gap-10">${validate_component(PricingCard, "PricingCard").$$render($$result, {}, {}, {
    content: () => {
      return `<ul slot="content" data-svelte-h="svelte-f1zdhq"><li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li></ul>`;
    },
    title: () => {
      return `<h2 slot="title" data-svelte-h="svelte-p9qm69">Hello</h2>`;
    }
  })} ${validate_component(PricingCard, "PricingCard").$$render($$result, {}, {}, {
    content: () => {
      return `<ul slot="content" data-svelte-h="svelte-f1zdhq"><li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li></ul>`;
    },
    title: () => {
      return `<h2 slot="title" data-svelte-h="svelte-p9qm69">Hello</h2>`;
    }
  })} ${validate_component(PricingCard, "PricingCard").$$render($$result, {}, {}, {
    content: () => {
      return `<ul slot="content" data-svelte-h="svelte-f1zdhq"><li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li> <li>hello</li></ul>`;
    },
    title: () => {
      return `<h2 slot="title" data-svelte-h="svelte-p9qm69">Hello</h2>`;
    }
  })}</section> <section><div data-svelte-h="svelte-nq1ku6"><h2 class="text-2xl text-center uppercase">Faq&#39;s</h2></div> <div class="w-1/2 pb-5 mx-auto">${validate_component(Faqs, "Faqs").$$render($$result, {}, {}, {})}</div></section> <section class="relative lg:grid lg:grid-cols-3 lg:py-10"><div class="flex justify-center w-full h-full rounded-md lg:col-span-2 bg-primary">${validate_component(GuyTwo, "GuyTwo").$$render($$result, {}, {}, {})}</div> <div class="place-self-center" data-svelte-h="svelte-2ptniz"><h2 class="lg:text-2xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h2> <p class="max-w-prose">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ipsa ratione, illo, quod quia
			dolorem, sapiente blanditiis cum accusamus soluta illum libero ad temporibus alias explicabo
			veritatis repellat deleniti voluptatibus.</p></div></section> <img src="/images/tri1.svg" alt="" class="relative rotate-180">`;
});
export {
  Page as default
};
