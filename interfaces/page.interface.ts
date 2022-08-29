export enum TopCategory {
	Courses,
	Services,
	Books,
	Goods,
}

export interface IHhData {
	count: number;
	juniorSalary: number;
	middleSalary: number;
	seniorSalary: number;
	updatedAt: Date;
	_id: string;
}

export interface IPageAdvantage {
	title: string;
	description: string;
	_id: string;
}

export interface IPageModel {
	_id: string;
	firstLevelCategory: TopCategory;
	secondLevelCategory: string;
	alias: string;
	title: string;
	category: string;
	hh?: IHhData;
	advantages?: IPageAdvantage[];
	seoText?: string;
	tegsTitle: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}
