import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../../interfaces/menu.interface';
import { ParsedUrlQuery } from 'node:querystring';
import { IProductModel } from '../../interfaces/product.interface';
import { IPageModel, TopCategory } from '../../interfaces/page.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';
import Head from 'next/head';

function TopPage({ page, products, firstLevelCategory }: ITopPageProps): JSX.Element {
	return (
		<>
			<Head>
				<title>{page.title}</title>
				<meta name="description" content={page.seoText} />
				<meta property="og:title" content={page.title} />
				<meta property="og:description" content={page.seoText} />
				<meta property="og:type" content="article" />
			</Head>
			<TopPageComponent page={page} products={products} firstLevelCategory={firstLevelCategory} />
		</>
	);
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const fml of firstLevelMenu) {
		const { data: menu } = await axios.post<IMenuItem[]>(API.page.find, {
			firstLevelCategory: fml.id,
		});
		paths = paths.concat(menu.flatMap((m) => m.pages.map((p) => `/${fml.route}/${p.alias}`)));
	}

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<ITopPageProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}
	const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	try {
		const { data: menu } = await axios.post<IMenuItem[]>(API.page.find, {
			firstLevelCategory: firstCategoryItem.id,
		});
		if (menu.length == 0) {
			return {
				notFound: true,
			};
		}
		const { data: page } = await axios.get<IPageModel>(API.page.byAlias + params.alias);
		const { data: products } = await axios.post<IProductModel[]>(API.product.find, {
			category: page.category,
			limit: 10,
		});

		return {
			props: {
				menu,
				firstLevelCategory: firstCategoryItem.id,
				page,
				products,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
};

interface ITopPageProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstLevelCategory: TopCategory;
	page: IPageModel;
	products: IProductModel[];
}
