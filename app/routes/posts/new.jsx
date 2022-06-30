import { redirect, json } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";

function validateTitle(title) {
  if (typeof title !== "string" || title.length < 3) {
    return "Length of title must be > 3";
  }
  return null;
}
function validateBody(body) {
  if (typeof body !== "string" || body.length < 10) {
    return "Length of body must be > 10";
  }
  return null;
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  const fields = {
    title,
    body,
  };

  const fieldErrors = {
    title: validateTitle(title),
    body: validateBody(body),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return json({ fieldErrors, fields }, { status: 400 });
  }

  const post = await db.post.create({ data: fields });

  return redirect(`/posts/${post.id}`);
};

export default function NewPost() {
  const actionData = useActionData();
  const { fieldErrors, fields } = actionData || {
    fieldErrors: null,
    fields: null,
  };
  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={fields?.title}
            />
            <div className="error">
              <p>{fieldErrors?.title && fieldErrors.title}</p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="body">Post body</label>
            <textarea name="body" id="body" defaultValue={fields?.body} />
            <div className="error">
              <p>{fieldErrors?.body && fieldErrors.body}</p>
            </div>
          </div>
          <button className="btn btn-block">Add Post</button>
        </form>
      </div>
    </>
  );
}
