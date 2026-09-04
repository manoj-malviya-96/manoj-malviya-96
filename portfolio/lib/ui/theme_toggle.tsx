"use client";

import {Button, setTheme, useTheme} from "@manoj-malviya-96/atom";
import {IconMoon, IconSun} from "@manoj-malviya-96/atom/icons";
import {useEffect, useState} from "react";

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
    };

    return (
        <Button
            icon={isDark ? <IconSun size="sm"/> : <IconMoon size="sm"/>}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            onClick={toggle}
            variant="plain"
            size="sm"
        />
    );
}
