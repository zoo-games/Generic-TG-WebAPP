/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { webpack, buildId, isServer }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_PUBLIC_CONFIG_BUILD_ID': JSON.stringify(buildId)
      })
    );
    return config;
  }
}

module.exports = nextConfig
