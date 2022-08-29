import { IProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declensionOfNumber, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(
	forwardRef(
		(
			{ product, className, ...props }: IProductProps,
			ref: ForwardedRef<HTMLDivElement>,
		): JSX.Element => {
			const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

			const reviewRef = useRef<HTMLDivElement>(null);

			const scrollToReview = (): void => {
				setIsReviewOpened(true);
				reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			};

			const variants = {
				visible: { opacity: 1, height: 'auto' },
				hidden: { opacity: 0, height: 0 },
			};

			return (
				<div className={className} {...props} ref={ref}>
					<Card className={styles.product}>
						<div className={styles.logo}>
							<Image
								alt={'image'}
								src="https://i1.sndcdn.com/artworks-000635780677-yhmbpw-t500x500.jpg"
								width={70}
								height={70}
							></Image>
						</div>
						<div className={styles.title}>{product.title}</div>
						<div className={styles.price}>
							{priceRu(product.price)}{' '}
							{product.oldPrice && (
								<Tag className={styles.sale} color="green">
									-{priceRu(product.oldPrice - product.price)}
								</Tag>
							)}
						</div>
						<div className={styles.credit}>
							{priceRu(product.credit)}
							<span className={styles.month}>/мес</span>
						</div>
						<div className={styles.rating}>
							<Rating rating={product.ratingAvg} />
						</div>
						<div className={styles.tags}>
							{product.categories.map((c) => (
								<Tag key={c} className={styles.category} color="gray">
									{c}
								</Tag>
							))}
						</div>
						<div className={styles.priceTitle}>цена</div>
						<div className={styles.creditTitle}>кредит</div>
						<div className={styles.rateTitle}>
							<a href="#ref" onClick={scrollToReview}>
								{`${product.reviewCount} ${declensionOfNumber(product.reviewCount, [
									'отзыв',
									'отзыва',
									'отзывов',
								])}`}
							</a>
						</div>

						<Divider className={styles.hr} />
						<div className={styles.description}>{product.description}</div>
						<div className={styles.features}>
							{product.characteristics.map((c) => (
								<div className={styles.characteristics} key={c.name}>
									<span className={styles.characteristicsName}>{c.name}</span>
									<span className={styles.characteristicsDots}></span>
									<span>{c.value}</span>
								</div>
							))}
						</div>
						<div className={styles.advBlock}>
							{product.advantages && (
								<div className={styles.advantages}>
									<div className={styles.advTitle}>Преимущества</div>
									<div>{product.advantages}</div>
								</div>
							)}
							{product.disadvantages && (
								<div className={styles.disadvantages}>
									<div className={styles.advTitle}>Недостатки</div>
									<div>{product.disadvantages}</div>
								</div>
							)}
						</div>
						<Divider className={cn(styles.hr, styles.hr2)} />
						<div className={styles.actions}>
							<Button appearance="primary">Узнать подробнее</Button>
							<Button
								appearance="ghost"
								arrow={isReviewOpened ? 'down' : 'right'}
								className={styles.reviewButton}
								onClick={(): void => setIsReviewOpened(!isReviewOpened)}
							>
								Читать отзывы
							</Button>
						</div>
					</Card>
					<motion.div
						animate={isReviewOpened ? 'visible' : 'hidden'}
						variants={variants}
						initial="hidden"
					>
						<Card color="blue" className={styles.reviews} ref={reviewRef}>
							{product.reviews.map((r) => (
								<div key={r._id}>
									<Review review={r}></Review>
									<Divider />
								</div>
							))}
							<ReviewForm productId={product._id} />
						</Card>
					</motion.div>
				</div>
			);
		},
	),
);