import cn from 'classnames';
import { motion } from 'framer-motion';

import { HeaderProps } from './Header.props';
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon';
import { Sidebar } from '../Sidebar/Sidebar';

import Logo from '../logo.svg';

import styles from './Header.module.css';
import { useState } from 'react';


export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20
			}
		},
		closed: {
			opacity: 0,
			x: '100%'
		}
	};

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
			<ButtonIcon appearance='white' icon='burger' onClick={(): void => setIsOpened(true)}/>
			<motion.div
				className={styles.mobileMenu}
				variants={variants}
				initial='closed'
				animate={isOpened? 'opened': 'closed'}
			>
				<Sidebar/>
				<ButtonIcon className={styles.menuClose} appearance='white' icon='close' onClick={(): void => setIsOpened(false)}/>
			</motion.div>
		</header>
	);
};