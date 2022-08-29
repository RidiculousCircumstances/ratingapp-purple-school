export const API = {
	page: {
		find: process.env.NEXT_PUBLIC_DOMAIN + '/api/page/findByCategory',
		byAlias: process.env.NEXT_PUBLIC_DOMAIN + '/api/page/byAlias/',
	},
	product: {
		find: process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
	},
	review: {
		create: process.env.NEXT_PUBLIC_DOMAIN + '/api/review/create',
	},
};
