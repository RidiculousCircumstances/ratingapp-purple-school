import { SortEnum, ISortProps } from './Sort.props';
import styles from './Sort.module.css';
import SortIcon from './sort.svg';
import cn from 'classnames';

export const Sort = ({ sort, setSort, className, ...props }: ISortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<span
				onClick={(): void => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating,
				})}
			>
				<SortIcon className={styles.sortIcon} /> По рейтингу
			</span>
			<span
				onClick={(): void => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price,
				})}
			>
				<SortIcon className={styles.sortIcon} /> По цене
			</span>
		</div>
	);
};
