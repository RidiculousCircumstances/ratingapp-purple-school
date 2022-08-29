import styles from './Up.module.css';
import cn from 'classnames';
import UpIcon from './up.svg';
import { useSrcollY } from '../../hooks/useScrollY';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Up = (): JSX.Element => {
	const controls = useAnimation();
	const yValue = useSrcollY();

	useEffect(() => {
		controls.start({ opacity: yValue / document.body.scrollHeight });
	}, [yValue, controls]);
	const scroll2Top = (): void => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	return (
		<motion.div animate={controls} initial={{ opacity: 0 }} className={styles.up}>
			<ButtonIcon appearance="white" icon="up" onClick={scroll2Top} />
		</motion.div>
	);
};
