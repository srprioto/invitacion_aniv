'use client';
import { useEffect, useRef, useState, ReactNode } from 'react';

export default function LazyMount({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const obs = new IntersectionObserver(
			([e]) => setVisible(e.isIntersecting),
			{ rootMargin: '200px' }
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	return <div ref={ref}>{visible ? children : null}</div>;
}