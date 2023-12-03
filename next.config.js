/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config) => {
  //   config.externals = [...config.externals, "bcrypt"];
  //   return config;
  // },
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};

module.exports = nextConfig;
