/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
	images: {
		domains: ['i1.sndcdn.com'],
	},
	webpack(config, options) {
		config.module.rules.push({
			loader: '@svgr/webpack',
			issuer: /\.[jt]sx?$/,
			options: {
				prettier: false,
				svgo: true,
				svgoConfig: {
					plugins: [
						{
							name: 'preset-default',
							params: {
								override: {
									removeViewBox: false,
								},
							},
						},
					],
				},
				titleProp: true,
			},
			test: /\.svg$/,
		});

		return config;
	},
};
