import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Button, Htag, Input, P, Rating, Tag, TextArea, Up } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../interfaces/menu.interface';
import { Search } from '../components/Search/Search';
import { API } from '../helpers/api';

function Home(menu: IHomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(0);
	return (
		<>
			<Htag tag="h1">Заголовок</Htag>
			<Button appearance="primary" arrow="right">
				Кнопка
			</Button>
			<Button appearance="ghost" arrow="right">
				Кнопка
			</Button>
			<P>Default</P>
			<P size="l">Large</P>
			<P size="m">Medium</P>
			<P size="s">Small</P>
			<Tag size="m" color="red" href="https://fonts.google.com/">
				tag
			</Tag>
			<Tag size="s" color="green" href="https://fonts.google.com/">
				tag
			</Tag>
			<Rating rating={rating} isEditable={true} setRating={setRating}></Rating>
			<Input placeholder="Test" />
			<TextArea placeholder="Test AREA" />
			<Search></Search>
			<Up />
		</>
	);
}

export default withLayout(Home);

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
