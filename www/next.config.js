const path = require('path');
const withPlugins = require('next-compose-plugins');
const withExportImages = require('next-export-optimize-images');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 960, 1280, 1600, 1920],
  },
  env: {
    NEXT_PUBLIC_ENV: 'PRODUCTION',
  },
  webpack: (config) => {
    const overridePath = path.resolve(__dirname, 'node_modules/react');
    config.resolve.alias['react'] = overridePath;
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

module.exports = withPlugins(
  [withVanillaExtract, withExportImages, withBundleAnalyzer],
  nextConfig
);
