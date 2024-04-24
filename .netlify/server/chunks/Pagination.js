import { c as create_ssr_component, b as each, e as escape, a as add_attribute } from "./ssr.js";
import { p as postsPerPage } from "./config.js";
const PostsList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts = [] } = $$props;
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  return `<ul class="lg:px-32">${each(posts, (post) => {
    return `<a href="${"/blog/" + escape(post.slug, true)}" class="rounded-lg shadow-lg py-4"><article class=""><div><img${add_attribute("src", post.coverImage, 0)} alt="" class="w-full h-64 object-cover"${add_attribute("width", post.coverWidth, 0)}${add_attribute("height", post.coverHeight, 0)} style="${"ratio: " + escape(post.coverWidth, true) + " / " + escape(post.coverHeight, true)}"> <h2>${escape(post.title)}</h2> </div></article> <p>${escape(post.excerpt)}</p> </a>`;
  })}</ul>`;
});
const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { currentPage } = $$props;
  let { totalPosts } = $$props;
  let { path = "/blog/page" } = $$props;
  let pagesAvailable;
  const isCurrentPage = (page) => page == currentPage;
  if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
    $$bindings.currentPage(currentPage);
  if ($$props.totalPosts === void 0 && $$bindings.totalPosts && totalPosts !== void 0)
    $$bindings.totalPosts(totalPosts);
  if ($$props.path === void 0 && $$bindings.path && path !== void 0)
    $$bindings.path(path);
  pagesAvailable = Math.ceil(totalPosts / postsPerPage);
  return ` ${pagesAvailable > 1 ? `<nav aria-label="Pagination navigation" class="pagination"><ul>${each(Array.from({ length: pagesAvailable }, (_, i) => i + 1), (page) => {
    return `<li><a href="${escape(path, true) + "/" + escape(page, true)}"${add_attribute("aria-current", isCurrentPage(page), 0)}><span class="sr-only">${isCurrentPage(page) ? `Current page:` : `Go to page`}</span> ${escape(page)}</a> </li>`;
  })}</ul></nav>` : ``}`;
});
export {
  PostsList as P,
  Pagination as a
};
