export interface IProductCharacteristic {
	name: string;
	value: string;
}

export interface IReviewModel {
	_id: string;
	name: string;
	title: string;
	description: string;
	rating: number;
	productId: string;
	createdAt: string;
}

export interface IProductModel {
	_id: string;
	image: string;
	title: string;
	price: number;
	oldPrice: number;
	credit: number;
	description: string;
	advantages?: string;
	disadvantages?: string;
	categories: string[];
	tags: string[];
	characteristics: IProductCharacteristic[];
	createdAt: Date;
	updatedAt: Date;
	reviews: IReviewModel[];
	reviewCount: number;
	ratingAvg: number;
}
