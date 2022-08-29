import { TopCategory } from './page.interface';

export interface IPageItem {
	alias: string;
	title: string;
	_id: string;
	category: string;
}

export interface IMenuItem {
	_id: {
		secondLevelCategory: string;
	};
	pages: IPageItem[];
	isOpened?: boolean;
}

export interface FirstLevelMenuItem {
	route: string;
	name: string;
	icon: JSX.Element;
	id: TopCategory;
}
