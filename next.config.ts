import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholders editoriais usados no seed
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      // Thumbnails do YouTube
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      // Permite imagens hospedadas externamente (capas cadastradas no admin)
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
