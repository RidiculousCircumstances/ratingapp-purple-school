import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { IHhData } from '../../interfaces/page.interface';

export interface HhDataProps extends IHhData {
	color?: 'white' | 'blue';
}
