import { RefObject, useCallback, useEffect, useRef, useState } from "react";

interface NavSection {
	id: string;
	label: string;
}

interface navRightPromp {
	containerRef: RefObject<HTMLElement | null>;
	navSection: NavSection[];
}


export default function NavRight({ containerRef, navSection }:navRightPromp) {

		
	const [activeId, setActiveId] = useState<string>('s1');

	const scrollToId = useCallback((id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const slides = Array.from(container.querySelectorAll<HTMLElement>('.slide'));

		// Marca el dot activo según el slide visible
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActiveId(entry.target.id);
				});
			},
			{ root: container, threshold: 0.6 },
		);
		slides.forEach((s) => observer.observe(s));

		// Soporte con teclado (desktop)
		const onKeyDown = (e: KeyboardEvent) => {
			const current = slides.findIndex((s) => Math.abs(s.getBoundingClientRect().top) < window.innerHeight / 2);

			if (e.key === 'ArrowDown' || e.key === 'PageDown') {
				e.preventDefault();
				slides[Math.min(current + 1, slides.length - 1)]?.scrollIntoView({ behavior: 'smooth' });
			}
			if (e.key === 'ArrowUp' || e.key === 'PageUp') {
				e.preventDefault();
				slides[Math.max(current - 1, 0)]?.scrollIntoView({ behavior: 'smooth' });
			}
		};
		document.addEventListener('keydown', onKeyDown);

		return () => {
			observer.disconnect();
			document.removeEventListener('keydown', onKeyDown);
		};
	}, []);

	return (
		<nav className="nav-dots">
			{navSection.map(({ id, label }) => (
				<a
					key={id}
					href={`#${id}`}
					className={activeId === id ? 'active' : undefined}
					aria-label={label}
					onClick={(e) => {
						e.preventDefault();
						scrollToId(id);
					}}
				/>
			))}
		</nav>
	)
}
