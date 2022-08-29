import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import axios from 'axios';
import { withLayout } from '../../layout/Layout';
import { IMenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'node:querystring';
import { API } from '../../helpers/api';

function Type({ firstLevelCategory }: ITypeProps): JSX.Element {
	return <>Type: {firstLevelCategory}</>;
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map((m) => `/` + m.route),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<ITypeProps> = async ({
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

	const { data: menu } = await axios.post<IMenuItem[]>(API.page.find, {
		firstLevelCategory: firstCategoryItem.id,
	});
	return {
		props: {
			menu,
			firstLevelCategory: firstCategoryItem.id,
		},
	};
};

interface ITypeProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstLevelCategory: number;
}
