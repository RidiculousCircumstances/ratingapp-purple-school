import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext, KeyboardEvent } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, IPageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
	const { menu, firstLevelCategory, setMenu } = useContext(AppContext);
	const router = useRouter();
	const variants = {
		visible: {
			marginBottom: 20,

			transition: { duration: 0.01, when: 'beforeChildren', staggerChildren: 0.001 },
		},
		hidden: { marginBottom: 0 },
	};
	const variantsChildren = {
		visible: { height: 29, opacity: 1 },
		hidden: { height: 0, opacity: 0 },
	};

	const openSecondLevel = (secondCategory: string): void => {
		setMenu &&
			setMenu(
				menu.map((m) => {
					if (m._id.secondLevelCategory === secondCategory) {
						m.isOpened = !m.isOpened;
					}
					return m;
				}),
			);
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string): void => {
		console.log(key.code);
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildFirstLevel = (): JSX.Element => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map((m) => (
					<li key={m.route}>
						<Link href={`/${m.route}`}>
							<a>
								<div
									className={cn(styles.firstLevel, {
										[styles.firstLevelActive]: m.id === firstLevelCategory,
									})}
								>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>
						{m.id == firstLevelCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};
	const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map((m) => {
					if (m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<li key={m._id.secondLevelCategory}>
							<div
								tabIndex={0}
								onKeyDown={(key: KeyboardEvent): void =>
									openSecondLevelKey(key, m._id.secondLevelCategory)
								}
								className={styles.secondLevel}
								onClick={(): void => openSecondLevel(m._id.secondLevelCategory)}
							>
								{m._id.secondLevelCategory}
							</div>
							<motion.div
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								layout
								variants={variants}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
							</motion.div>
						</li>
					);
				})}
			</ul>
		);
	};
	const buildThirdLevel = (pages: IPageItem[], route: string, isOpened: boolean): JSX.Element[] => {
		return pages.map((p) => (
			<motion.div key={p._id} variants={variantsChildren}>
				<Link href={`/${route}/${p.alias}`}>
					<a
						tabIndex={isOpened ? 0 : -1}
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath,
						})}
					>
						{p.category}
					</a>
				</Link>
			</motion.div>
		));
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
