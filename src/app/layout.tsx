import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import '../styles/globals.scss';

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-montserrat',
	display: 'swap',
});

const cormorant = Cormorant_Garamond({
	subsets: ['latin'],
	weight: ['300', '400', '600', '700'],
	variable: '--font-cormorant',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Invitación LXIX Aniversario GERESA',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
	themeColor: '#2E1A47',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="es"
			className={`${montserrat.variable} ${cormorant.variable}`}
			suppressHydrationWarning
		>
			<body suppressHydrationWarning>{children}</body>
		</html>
	);
}