import { ITextAreaProps } from './Textarea.props';
import styles from './Textarea.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const TextArea = forwardRef(
	(
		{ className, error, ...props }: ITextAreaProps,
		ref: ForwardedRef<HTMLTextAreaElement>,
	): JSX.Element => {
		return (
			<div className={cn(styles.textareaWrapper, className)}>
				<textarea
					className={cn(styles.textarea, { [styles.textareaerror]: error })}
					{...props}
					ref={ref}
				/>
				{error && <span className={styles.errorMessage}>{error.message}</span>}
			</div>
		);
	},
);
