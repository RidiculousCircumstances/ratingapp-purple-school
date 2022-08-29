import CoursesIcon from './icons/courses.svg';
import BooksIcon from './icons/books.svg';
import ServicesIcon from './icons/services.svg';
import GoodsIcon from './icons/goods.svg';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';
import { TopCategory } from '../interfaces/page.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopCategory.Courses },
	{ route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopCategory.Books },
	{ route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopCategory.Services },
	{ route: 'goods', name: 'Товары', icon: <GoodsIcon />, id: TopCategory.Goods },
];

export const priceRu = (price: number): string =>
	price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		.concat(' ₽');

export const declensionOfNumber = (number: number, titles: [string, string, string]): string => {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[
		number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
	];
};
