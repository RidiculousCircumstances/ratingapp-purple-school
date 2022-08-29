import { IRatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import StarIcon from './star.svg';

export const Rating = forwardRef(
	(
		{ isEditable = false, rating, setRating, error, ...props }: IRatingProps,
		ref: ForwardedRef<HTMLDivElement>,
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

		useEffect(() => {
			constructRating(rating);
		}, [rating]); //реакт ожидает, что вся логика из констр рейтинг будет в хуке. Но она не в хуке для переиспользования, хотя спорно

		const constructRating = (currentRating: number): void => {
			const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
				return (
					<span
						className={cn(styles.star, {
							[styles.filled]: i < currentRating,
							[styles.editable]: isEditable,
						})}
						onMouseEnter={(): void => changeDisplay(i + 1)}
						onMouseLeave={(): void => changeDisplay(rating)}
						onClick={(): void => onClick(i + 1)}
					>
						<StarIcon
							tabIndex={isEditable ? 0 : -1}
							onKeyDown={(e: KeyboardEvent<SVGElement>): void | false =>
								isEditable && handleSpace(i + 1, e)
							}
						/>
					</span>
				);
			});
			setRatingArray(updatedArray);
		};

		const changeDisplay = (i: number): void => {
			if (!isEditable) {
				return;
			}
			constructRating(i);
		};

		const onClick = (i: number): void => {
			if (!isEditable || !setRating) {
				return;
			}
			setRating(i);
		};

		const handleSpace = (i: number, e: KeyboardEvent<SVGElement>): void => {
			if (e.code != 'Space' || !setRating) {
				return;
			}
			setRating(i);
		};

		return (
			<div {...props} ref={ref} className={cn(styles.rateWrapper, { [styles.error]: error })}>
				{ratingArray.map((r, i) => (
					<span key={i}>{r}</span>
				))}
				{error && <span className={styles.rateerror}>{error.message}</span>}
			</div>
		);
	},
);
