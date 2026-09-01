"use client";

import { Button, setTheme, useTheme } from "@manoj-malviya-96/atom";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

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
			icon={isDark ? <Sun /> : <Moon />}
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			onClick={toggle}
			variant="plain"
		/>
	);
}
