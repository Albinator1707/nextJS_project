import { FunctionComponent, KeyboardEvent, useState, useRef } from 'react';
import cn from 'classnames';
import { LayoutProps } from './Layout.props';
import { Header, Sidebar, Footer } from './index';

import styles from './Layout.module.css';
import { AppContextProvider, IAppContext } from '@/context/app.context';
import { Up } from '@/components';


const Layout = ({ children }: LayoutProps): JSX.Element => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
	const bodyRef = useRef<HTMLDivElement>(null);
	const skipContentAction = (key: KeyboardEvent): void => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};

	return(
		<div className={styles.wrapper}>
			<a
				onFocus={(): void => setIsSkipLinkDisplayed(true)}
				tabIndex={1}
				className={cn(styles.skipLink, {
					[styles.displayed]: isSkipLinkDisplayed
				})}
				onKeyDown={skipContentAction}
			>Сразу к содержанию</a>
		<Header className={styles.header}/>
		<Sidebar className={styles.sidebar}/>
		<div className={styles.body} ref={bodyRef} tabIndex={0}>
			{children}
		</div>
		<Footer className={styles.footer}/>
		<Up/>
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext> (Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element{
		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};