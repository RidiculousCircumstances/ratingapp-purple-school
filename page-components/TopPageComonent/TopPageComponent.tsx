import { ITopPageComponentProps } from './TopPageComponent.props';
import cn from 'classnames';
import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import styles from './TopPageComponent.module.css';
import { TopCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';
import { useSrcollY } from '../../hooks/useScrollY';

export const TopPageComponent = ({
	page,
	products,
	firstLevelCategory,
}: ITopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
		products,
		sort: SortEnum.Rating,
	});

	const setSort = (sort: SortEnum): void => {
		dispatchSort({ type: sort });
	};

	useEffect(() => {
		dispatchSort({ type: 'reset', initialState: products });
	}, [products]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag="h1">{page.title}</Htag>
				{products && (
					<Tag color="gray" size="m">
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort}></Sort>
			</div>
			<div>
				{sortedProducts && sortedProducts.map((p) => <Product layout key={p._id} product={p} />)}
			</div>
			{firstLevelCategory == TopCategory.Courses && page.hh && (
				<div className={styles.hhTitle}>
					<Htag tag="h3">Вакансии - {page.category}</Htag>
					<Tag color="red" size="m">
						hh.ru
					</Tag>
				</div>
			)}

			{firstLevelCategory == TopCategory.Courses && page.hh && <HhData {...page.hh} />}
			{page.advantages && page.advantages.length > 0 && (
				<>
					<Htag tag="h2">Преимущества</Htag>
					<Advantages advantages={page.advantages}></Advantages>
				</>
			)}
			{page.seoText && (
				<div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />
			)}
			<Htag tag="h2">Получаемые навыки</Htag>
			{page.tags.map((t) => (
				<Tag key={t + Math.random()} color="primary">
					{t}
				</Tag>
			))}
		</div>
	);
};
