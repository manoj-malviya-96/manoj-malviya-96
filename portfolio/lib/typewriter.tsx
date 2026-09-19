"use client";

import { Text } from "@manoj-malviya-96/atom";
import { useEffect, useState } from "react";

type TypeWriterProps = {
	words: string[];
	typingSpeed?: number;
	deletingSpeed?: number;
	pauseDuration?: number;
};

type State = { kind: "adding" | "deleting"; wordIndex: number; length: number };

export default function TypeWriter({
	words,
	typingSpeed = 70,
	deletingSpeed = 40,
	pauseDuration = 1500,
}: TypeWriterProps) {
	const [state, setState] = useState<State>({
		kind: "adding",
		wordIndex: 0,
		length: 0,
	});
	const word = words[state.wordIndex % words.length] ?? "";

	useEffect(() => {
		if (words.length === 0) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion) {
			const timeout = setTimeout(() => {
				setState((current) => {
					const nextIndex = (current.wordIndex + 1) % words.length;
					return {
						kind: "adding",
						wordIndex: nextIndex,
						length: (words[nextIndex] ?? "").length,
					};
				});
			}, pauseDuration);
			return () => clearTimeout(timeout);
		}

		switch (state.kind) {
			case "adding": {
				if (state.length === word.length) {
					const timeout = setTimeout(
						() => setState({ ...state, kind: "deleting" }),
						pauseDuration,
					);
					return () => clearTimeout(timeout);
				}
				const timeout = setTimeout(
					() =>
						setState((current) => ({ ...current, length: current.length + 1 })),
					typingSpeed,
				);
				return () => clearTimeout(timeout);
			}
			case "deleting": {
				if (state.length === 0) {
					setState({
						kind: "adding",
						wordIndex: (state.wordIndex + 1) % words.length,
						length: 0,
					});
					return;
				}
				const timeout = setTimeout(
					() =>
						setState((current) => ({ ...current, length: current.length - 1 })),
					deletingSpeed,
				);
				return () => clearTimeout(timeout);
			}
			default: {
				const exhaustive: never = state.kind;
				return exhaustive;
			}
		}
	}, [words, word, state, typingSpeed, deletingSpeed, pauseDuration]);

	return (
		<Text variant="subtitle">
			{word.slice(0, state.length)}
			<span className="typewriter-cursor" aria-hidden="true" />
		</Text>
	);
}
