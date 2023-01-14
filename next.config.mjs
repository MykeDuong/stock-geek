// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */

import path from 'path'
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

const __dirname = path.resolve();

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  output: 'standalone',
  experimental: {
		esmExternals: false, // optional
		externalDir: true, // optional
		outputFileTracingRoot: path.join(__dirname, '../../'), // monorepo option
	}
};
export default config;
