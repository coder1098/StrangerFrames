import type { NextConfig } from "next";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['javascript', 'python', 'java'],
          filename: 'static/[name].worker.js',
          features: [
            'bracketMatching',
            'find',
            'folding',
            'hover',
            'format',
            'suggest',
            'snippet',
            'colorPicker',
            'parameterHints'
          ],
        })
      );
    }

    return config;
  },
  
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;