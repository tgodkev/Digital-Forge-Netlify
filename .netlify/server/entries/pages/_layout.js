import { e as error } from "../../chunks/index.js";
const prerender = true;
const csr = true;
const load = async ({ url }) => {
  try {
    return {
      path: url.pathname
    };
  } catch (err) {
    error(500, err);
  }
};
export {
  csr,
  load,
  prerender
};
