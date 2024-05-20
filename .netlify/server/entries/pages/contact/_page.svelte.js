import { c as create_ssr_component, f as compute_rest_props, h as spread, j as escape_attribute_value, k as escape_object, a as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { c as cn } from "../../../chunks/gsapConfig.js";
import { B as Button } from "../../../chunks/index3.js";
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value", "readonly"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { readonly = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  return `<input${spread(
    [
      {
        class: escape_attribute_value(cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className))
      },
      { readonly: readonly || null },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("value", value, 0)}>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-rg684o_START -->${$$result.title = `<title>Contact</title>`, ""}<!-- HEAD_svelte-rg684o_END -->`, ""} <section class="p-5"><h1 data-svelte-h="svelte-tbczl2">Contact</h1> <form name="contact-page-form" class="max-w-2xl" method="POST" netlify-honeypot="bot-field" data-netlify="true"><input type="hidden" name="form-name" value="contact-page-form"> <label for="name" data-svelte-h="svelte-bs9sy6">Name</label> ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "name",
      id: "name",
      required: true,
      placeholder: "Name",
      type: "text"
    },
    {},
    {}
  )} <label for="email" data-svelte-h="svelte-1p9d3fm">Email</label> ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "email",
      id: "email",
      required: true,
      placeholder: "Email",
      type: "email"
    },
    {},
    {}
  )} <label for="message" data-svelte-h="svelte-4uee20">Message</label> ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "message",
      id: "message",
      required: true,
      placeholder: "Message",
      type: "text"
    },
    {},
    {}
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "submit",
      class: "mt-2",
      size: "lg",
      value: "Submit"
    },
    {},
    {
      default: () => {
        return `Submit`;
      }
    }
  )}</form></section>`;
});
export {
  Page as default
};
