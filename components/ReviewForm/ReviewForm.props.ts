import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IReviewModel } from '../../interfaces/product.interface';

export interface IReviewFormProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	productId: string;
}
