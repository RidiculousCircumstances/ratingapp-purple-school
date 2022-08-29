import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { KeyboardEvent, useState } from 'react';
import SearchIcon from './search.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch = (): void => {
		router.push({
			pathname: '/search',
			query: {
				q: search,
			},
		});
	};

	const handleKeyDown = (e: KeyboardEvent): void => {
		if (e.key == 'Enter') {
			goToSearch();
		}
	};
	return (
		<div className={cn(className, styles.search)} {...props}>
			<Input
				className={styles.input}
				placeholder="Поиск..."
				value={search}
				onChange={(e): void => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button appearance="primary" className={styles.button} onClick={goToSearch}>
				<SearchIcon />
			</Button>
		</div>
	);
};
