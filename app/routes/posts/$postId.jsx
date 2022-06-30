import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const post = await db.post.findUnique({ where: { id: params.postId } });
  if (!post) throw new Error("Post not found");
  return { post };
};

export const action = async ({ params, request }) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    const post = await db.post.findUnique({ where: { id: params.postId } });
  }
  await db.post.delete({ where: { id: params.postId } });
  return redirect("/posts");
};

export default function Post() {
  const { post } = useLoaderData();
  return (
    <div>
      <h1>{post.title}</h1>
      <Link to="/posts" classname="btn btn-reverse">
        Back
      </Link>
      <div className="page-content">{post.body}</div>
      <div className="page-footer">
        <form method="POST">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete">delete</button>
        </form>
      </div>
    </div>
  );
}
