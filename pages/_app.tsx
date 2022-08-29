import { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import React from 'react';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';
import Router from 'next/router';

Router.events.on('routeChangeComplete', (url: string) => {
	if (typeof window !== 'undefined') {
		ym('hit', url);
	}
});

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>Рейтинг IT курсов</title>
				<link rel="icon" href="/favicon.ico" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link rel="preconnect" href="https://mc.yandex.ru" />
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap"
					rel="stylesheet"
				/>
				<meta property="og:url" content={'http://localhost:3000' + router.asPath} />
				<meta property="og:locale" content={'ru_RU'} />
			</Head>
			<YMInitializer accounts={[]} options={{ webvisor: true, defer: true }} version="2" />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
