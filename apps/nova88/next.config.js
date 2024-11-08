// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")
const path = require("path")

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/

const nextConfig = {
	// basePath 設定會預設在所有 pages / router / api 底下加上一層 subPath 以符合後端需要的結構
	assetPrefix: '/rewards',
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	async rewrites() {
		return {
			fallback: [
				{
					source: "/rewards/:path*",
					destination: '/:path*',
				},
				{
					source: "/api/:path*",
					destination: `${process.env.NEXT_PUBLIC_ENV_DB_HOST}/api/:path*`,
				},
				{
					source: "/health",
					destination: "/api/health",
				},
			],
		}
	},
	// Set this to true if you use CSS modules.
	// See: https://github.com/css-modules/css-modules
	cssModules: false,
	// 優化專案 build 出來的檔案結構，僅獨立輸出必要的資源而非整包 node_module , 控管 docker image 大小
	// https://nextjs.org/docs/pages/api-reference/next-config-js/output
	// https://github.com/nrwl/nx/issues/9017
	output: "standalone",
	experimental: {
		outputStandalone: true,
		outputFileTracingRoot: path.join(__dirname, "../../"),
	},
}

module.exports = withNx(nextConfig)
