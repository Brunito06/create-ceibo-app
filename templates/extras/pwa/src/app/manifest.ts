import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "__APP_TITLE__",
    short_name: "__APP_TITLE__",
    description: "__APP_TITLE__",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icons/icon.svg", sizes: "192x192", type: "image/svg+xml" },
      { src: "/icons/icon.svg", sizes: "512x512", type: "image/svg+xml" },
      { src: "/icons/icon.svg", sizes: "512x512", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
