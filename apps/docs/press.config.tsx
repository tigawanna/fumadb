import { defineConfig } from "fumapress";
import { fumadocsMdx } from "fumapress/adapters/mdx";
import { flexsearchPlugin } from "fumapress/plugins/flexsearch";
import { llmsPlugin } from "fumapress/plugins/llms.txt";
import { takumiPlugin } from "fumapress/plugins/takumi";
import { docs } from "./.source/server";
import { lucideIconsPlugin } from "fumadocs-core/source/plugins/lucide-icons";
import { createDocsLayoutPage } from "fumapress/layouts/docs";
import { createHomeLayout } from "fumapress/layouts/home";
import { imagePlugin } from "fumapress/plugins/image/vercel";
import { sitemapPlugin } from "fumapress/plugins/sitemap";
import { linkValidationPlugin } from "fumapress/plugins/link-validation";

const config = defineConfig({
  content: docs.toFumadocsSource({
    baseDir: "docs",
  }),
  loaderOptions: {
    plugins: [lucideIconsPlugin()],
  },
  site: {
    name: "FumaDB",
    baseUrl: "https://fumadb.vercel.app",
    git: {
      user: "fuma-nama",
      repo: "fumadb",
      branch: "main",
    },
  },
  meta: {
    root() {
      return (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap"
            rel="stylesheet"
          />
        </>
      );
    },
  },
})
  .plugins(
    flexsearchPlugin(),
    llmsPlugin(),
    takumiPlugin(),
    linkValidationPlugin(),
    imagePlugin(),
    sitemapPlugin(),
  )
  .adapters(fumadocsMdx())
  .useLayouts({
    page: createDocsLayoutPage({
      render() {
        return {
          pageProps: {
            tableOfContent: { style: "clerk" },
          },
        };
      },
    }),
  });

export const HomeLayout = createHomeLayout<Ctx>({
  layoutProps: {
    links: [
      {
        text: "Documentation",
        url: "/docs",
        active: "nested-url",
      },
    ],
  },
});

export type Ctx = (typeof config)["$context"];

export default config;
