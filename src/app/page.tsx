import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<h1>Home</h1>
			<Link href="/web">Ir a Web</Link><br />
			<Link href="/app">Ir a app</Link>
		</div>
	);
}