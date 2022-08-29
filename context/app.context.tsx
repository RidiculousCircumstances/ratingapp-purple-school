import React, { createContext, PropsWithChildren, ReactNode, useState } from 'react';
import { IMenuItem } from '../interfaces/menu.interface';
import { TopCategory } from '../interfaces/page.interface';

export interface IAppContext {
	menu: IMenuItem[];
	firstLevelCategory: TopCategory;
	setMenu?: (newMenu: IMenuItem[]) => void;
}
export const AppContext = createContext<IAppContext>({
	menu: [],
	firstLevelCategory: TopCategory.Courses,
});

export const AppContextProvider = ({
	menu,
	firstLevelCategory,
	children,
}: PropsWithChildren<IAppContext>): JSX.Element => {
	const [menuState, setMenuState] = useState<IMenuItem[]>(menu);
	const setMenu = (newMenu: IMenuItem[]): void => {
		setMenuState(newMenu);
	};
	return (
		<AppContext.Provider value={{ menu: menuState, firstLevelCategory, setMenu }}>
			{children}
		</AppContext.Provider>
	);
};
