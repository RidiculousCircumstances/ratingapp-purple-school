import { IReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { TextArea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, className, ...props }: IReviewFormProps): JSX.Element => {
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IReviewForm>();
	const onSubmit = async (formData: IReviewForm): Promise<void> => {
		try {
			const response = await axios.post<IReviewSentResponse>(API.review.create, {
				...formData,
				productId,
			});
			if (response.status == 201) {
				setIsSuccess(true);
				reset();
			} else {
				setError(`Ошибка ${response.status}`);
			}
		} catch (e) {
			setError(e as string);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', { required: { value: true, message: 'Имя не заполнено' } })}
					placeholder="Имя"
					error={errors.name}
				/>
				<Input
					{...register('title', { required: { value: true, message: 'заголовок не заполнен' } })}
					placeholder="Заголовок отзыва"
					className={styles.title}
					error={errors.title}
				/>
				<div className={styles.rate}>
					<span>Оценка: </span>
					<Controller
						rules={{ required: { value: true, message: 'Рейтинг не указан' } }}
						control={control}
						name="rating"
						render={({ field }): JSX.Element => (
							<Rating
								isEditable
								rating={field.value}
								ref={field.ref}
								setRating={field.onChange}
								error={errors.rating}
							/>
						)}
					/>
				</div>
				<TextArea
					{...register('description', {
						required: { value: true, message: 'Описание не заполнено' },
					})}
					placeholder="Текст отзыва"
					className={styles.description}
					error={errors.description}
				/>
				<div className={styles.submit}>
					<Button appearance="primary">Отправить</Button>
					<span className={styles.info}>
						*Перед публикацией отзыв пройдет предварительную модерацию и проверку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.success, styles.panel)}>
					<div className={styles.successTitle}>Ваш отзыв отправлен</div>
					<div>Отзыв будет опубликован после проверки.</div>
					<CloseIcon className={styles.close} onClick={(): void => setIsSuccess(false)} />
				</div>
			)}
			{error && (
				<div className={cn(styles.error, styles.panel)}>
					<CloseIcon className={styles.close} onClick={(): void => setError(undefined)} />
					Что-то пошло не так. Попробуйте обновить страницу
				</div>
			)}
		</form>
	);
};
