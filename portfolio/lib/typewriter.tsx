"use client";

import { Text } from "@manoj-malviya-96/atom";
import { useEffect, useState } from "react";

type TypeWriterProps = {
	words: string[];
	typingSpeed?: number;
	deletingSpeed?: number;
	pauseDuration?: number;
};

export default function TypeWriter({
	words,
	typingSpeed = 70,
	deletingSpeed = 40,
	pauseDuration = 1500,
}: TypeWriterProps) {
	const [wordIndex, setWordIndex] = useState(0);
	const [subIndex, setSubIndex] = useState(0);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (words.length === 0) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const word = words[wordIndex % words.length] ?? "";

		if (prefersReducedMotion) {
			const timeout = setTimeout(() => {
				setWordIndex((index) => (index + 1) % words.length);
			}, pauseDuration);
			return () => clearTimeout(timeout);
		}

		if (!deleting && subIndex === word.length) {
			const timeout = setTimeout(() => setDeleting(true), pauseDuration);
			return () => clearTimeout(timeout);
		}

		if (deleting && subIndex === 0) {
			setDeleting(false);
			setWordIndex((index) => (index + 1) % words.length);
			return;
		}

		const timeout = setTimeout(
			() => setSubIndex((index) => index + (deleting ? -1 : 1)),
			deleting ? deletingSpeed : typingSpeed,
		);
		return () => clearTimeout(timeout);
	}, [
		words,
		wordIndex,
		subIndex,
		deleting,
		typingSpeed,
		deletingSpeed,
		pauseDuration,
	]);

	const word = words[wordIndex % words.length] ?? "";
	const prefersReducedMotion =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const visible = prefersReducedMotion ? word : word.slice(0, subIndex);

	return (
		<Text variant="subtitle">
			{visible}
			<span className="typewriter-cursor" aria-hidden="true" />
		</Text>
	);
}
