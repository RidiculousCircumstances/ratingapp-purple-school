import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IReviewModel } from '../../interfaces/product.interface';

export interface IReviewProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	review: IReviewModel;
}
