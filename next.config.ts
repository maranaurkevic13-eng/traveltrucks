import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ac.goit.global"], // 👈 дозволяємо цей домен
  },
  reactCompiler: true,
};

export default nextConfig;
