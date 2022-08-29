import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { LayoutProps } from './Layout.props';
import { FunctionComponent, KeyboardEvent, useRef, useState } from 'react';
import styles from './Layout.module.css';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components';
import cn from 'classnames';

const Layout = ({ children }: LayoutProps): JSX.Element => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>();
	const skipContentAction = (key: KeyboardEvent): void => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};
	const bodyRef = useRef<HTMLDivElement>(null);

	return (
		<div className={styles.wrapper}>
			<a
				onFocus={(): void => setIsSkipLinkDisplayed(true)}
				tabIndex={1}
				className={cn(styles.skipLink, { [styles.skipLinkDiplayed]: isSkipLinkDisplayed })}
				onKeyDown={skipContentAction}
			>
				Сразу к содержанию
			</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<div className={styles.body} ref={bodyRef} tabIndex={0}>
				{children}
			</div>
			<Footer className={styles.footer} />
			<Up />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
	Component: FunctionComponent<T>,
) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider menu={props.menu} firstLevelCategory={props.firstLevelCategory}>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};
