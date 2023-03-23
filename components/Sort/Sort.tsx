import cn from 'classnames';
import { SortEnum, SortProps } from './Sort.props';

import SortIcon from './Sort.svg';

import styles from './Sort.module.css';

export const Sort = ({ sort, setSort, className, ...props }: SortProps):JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<span
				onClick={():void => setSort(SortEnum.byRating)}
				className={cn({
					[styles.active]: sort === SortEnum.byRating
				})}>
				<SortIcon className={styles.sortIcon} /> По рейтингу 
			</span>
			<span
				onClick={():void => setSort(SortEnum.byPrice)}
				className={cn({
					[styles.active]: sort === SortEnum.byPrice
				})}>
				<SortIcon className={styles.sortIcon} /> По&nbsp;цене 
			</span>
		</div>
	);
};