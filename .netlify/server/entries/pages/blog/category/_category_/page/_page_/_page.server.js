import { r as redirect } from "../../../../../../../chunks/index.js";
import { p as postsPerPage } from "../../../../../../../chunks/config.js";
import { f as fetchPosts } from "../../../../../../../chunks/fetchPosts.js";
const load = async ({ url, params, fetch }) => {
  const page = parseInt(params.page) || 1;
  const { category } = params;
  if (page <= 1) {
    redirect(301, `/blog/category/${category}`);
  }
  let offset = page * postsPerPage - postsPerPage;
  const totalPostsRes = await fetch(`${url.origin}/api/posts/count`);
  const total = await totalPostsRes.json();
  const { posts } = await fetchPosts({ offset, page });
  return {
    posts,
    page,
    category,
    totalPosts: total
  };
};
export {
  load
};
