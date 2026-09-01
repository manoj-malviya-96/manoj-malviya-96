"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Button, setTheme, useTheme } from "@manoj-malviya-96/atom";
import { useEffect, useState } from "react";
import { Icon } from "@/lib/ui";

const STORAGE_KEY = "theme";

export default function ThemeToggle() {
	const theme = useTheme();
	const [systemPrefersDark, setSystemPrefersDark] = useState(false);

	useEffect(() => {
		const query = window.matchMedia("(prefers-color-scheme: dark)");
		setSystemPrefersDark(query.matches);
		const onChange = (e: MediaQueryListEvent) =>
			setSystemPrefersDark(e.matches);
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);

	const isDark = theme === "dark" || (theme === "system" && systemPrefersDark);

	const toggle = () => {
		const next = isDark ? "light" : "dark";
		setTheme(next);
		localStorage.setItem(STORAGE_KEY, next);
	};

	return (
		<Button
			icon={<Icon icon={isDark ? faSun : faMoon} />}
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			onClick={toggle}
			variant="plain"
		/>
	);
}
