import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      resolveAlias: {
        // Mirror your Webpack aliases here for Turbopack
        "@": path.resolve(__dirname),
        "@/public": path.resolve(__dirname, "public"),
        "@/src": path.resolve(__dirname, "src"),
        "@/app": path.resolve(__dirname, "src/app"),
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib": path.resolve(__dirname, "src/lib"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
        "@/domain": path.resolve(__dirname, "src/domain"),
        "@/context": path.resolve(__dirname, "src/context"),
        "@/api": path.resolve(__dirname, "src/api"),
        "@/utils": path.resolve(__dirname, "src/utils"),
      },
    },
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.resolve.alias["@/public"] = path.resolve(__dirname, "public");
    config.resolve.alias["@/src"] = path.resolve(__dirname, "src");
    config.resolve.alias["@/app"] = path.resolve(__dirname, "src/app");
    config.resolve.alias["@/components"] = path.resolve(
      __dirname,
      "src/components"
    );
    config.resolve.alias["@/lib"] = path.resolve(__dirname, "src/lib");
    config.resolve.alias["@/hooks"] = path.resolve(__dirname, "src/hooks");
    config.resolve.alias["@/domain"] = path.resolve(__dirname, "src/domain");
    config.resolve.alias["@/context"] = path.resolve(__dirname, "src/context");
    config.resolve.alias["@/api"] = path.resolve(__dirname, "src/api");
    config.resolve.alias["@/utils"] = path.resolve(__dirname, "src/utils");

    return config;
  },
  images: {
    localPatterns: [
      {
        pathname: "./public/**",
      },
      {
        pathname: "./src/brand/**",
      },
      {
        pathname: "/media/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          process.env.NEXT_PUBLIC_CONFIG_IMAGE_URL || "default.hostname.com",
        port: "",
        pathname: "/media/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
