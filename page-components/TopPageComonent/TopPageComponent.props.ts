import { ReactNode } from 'react';
import { IPageModel, TopCategory } from '../../interfaces/page.interface';
import { IProductModel } from '../../interfaces/product.interface';

export interface ITopPageComponentProps {
	firstLevelCategory: TopCategory;
	page: IPageModel;
	products: IProductModel[];
}
