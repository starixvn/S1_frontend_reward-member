// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/

const isDevelopment = process.env.NODE_ENV !== "production"
const rewritesConfig = isDevelopment
	? [
			{
				source: "/api/:path*",
				destination: "https://www.n88dev.com/api/:path*",
			},
	  ]
	: []

const nextConfig = {
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	images: {
		domains: ["store.0814media.net"],
	},
	// reactStrictMode: true,
	rewrites: async () => rewritesConfig,
}

module.exports = withNx(nextConfig)
