import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  ScrollRestoration,
} from "@remix-run/react";
import globalStylesUrl from "~/styles/global.css";

export const links = () => [{ rel: "stylesheet", href: globalStylesUrl }];
export const meta = () => {
  const description = "A blog built with the help of BTrav ";
  const keywords = "remix, react, javascript";
  return {
    description,
    keywords,
  };
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children, title }) {
  return (
    <html lang="en">
      <head>
        <Links />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <title>{title ? title : "Jared's Remix Blog"}</title>
      </head>
      <body>
        {/* whichever route we're on will output here */}
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        <ScrollRestoration />
      </body>
    </html>
  );
}

function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>
        <ul className="nav">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
      <div className="container">{children}</div>
    </>
  );
}
export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
}
