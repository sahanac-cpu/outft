/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // the interactive demo apps — always revalidate so edits show up
        // immediately instead of sitting behind a stale browser cache
        source: "/demo/:file*.html",
        headers: [
          { key: "Cache-Control", value: "no-cache, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
