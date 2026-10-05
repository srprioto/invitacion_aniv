import type { Metadata } from 'next';
// ...tus imports de fuentes, etc.

export const metadata: Metadata = {
	title: 'LXIX Aniversario Institucional',
	description: 'Invitación institucional',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body>
				<div className="app-mobile-frame">
					{children}
				</div>
			</body>
		</html>
	);
}