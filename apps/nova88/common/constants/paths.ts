const paths = {
	forgetPassword: "forgetPassword",
	join: "join",
	appDownload: "appDownload",
	shopping: "shopping",
	about: {
		root: "/about",
		sub: {
			points: {
				root: "/about/points",
				authRequired: true,
			},
			purchase: {
				root: "/about/purchase",
				authRequired: true,
			},
			howtoearnpoints: {
				root: "/about/howtoearnpoints",
			},
			rewardfaq: {
				root: "/about/rewardfaq",
			},
		},
	},
}

export { paths }
