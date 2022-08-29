import { GetStaticProps } from 'next';

import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Search(menu: IHomeProps): JSX.Element {
	return <>Search</>;
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
	const firstLevelCategory = 0;
	const { data: menu } = await axios.post<IMenuItem[]>(API.page.find, { firstLevelCategory });
	return {
		props: {
			menu,
			firstLevelCategory,
		},
	};
};

interface IHomeProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstLevelCategory: number;
}
