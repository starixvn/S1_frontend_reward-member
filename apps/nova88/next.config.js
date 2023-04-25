// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/

const isDevelopment = process.env.NODE_ENV !== "production"

const nextConfig = {
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	// Set this to true if you use CSS modules.
	// See: https://github.com/css-modules/css-modules
	cssModules: false,
	async rewrites() {
		return {
			fallback: isDevelopment
				? [
						{
							source: "/api/:path*",
							destination: "https://www.n88dev.com/api/:path*",
						},
				  ]
				: [],
		}
	},
}

module.exports = withNx(nextConfig)
