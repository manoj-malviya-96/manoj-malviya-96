import { type RefObject, useEffect, useRef } from "react";
import { FaceCanvasTune } from "./config";

export type PointerState = {
	x: number;
	y: number;
	targetX: number;
	targetY: number;
	strength: number;
	targetStrength: number;
};

/** Tracks the pointer in clip-space (-aspect..aspect, -1..1) while it's over `elementRef`. */
export function usePointer(
	elementRef: RefObject<HTMLElement | null>,
	aspectRef: RefObject<number>,
): RefObject<PointerState> {
	const pointerRef = useRef<PointerState>({
		x: 0,
		y: 0,
		targetX: 0,
		targetY: 0,
		strength: 0,
		targetStrength: 0,
	});

	useEffect(() => {
		function onPointerMove(e: PointerEvent): void {
			const element = elementRef.current;
			if (!element) return;
			const rect = element.getBoundingClientRect();
			const localX = e.clientX - rect.left;
			const localY = e.clientY - rect.top;
			const inside =
				localX >= 0 &&
				localX <= rect.width &&
				localY >= 0 &&
				localY <= rect.height;

			const pointer = pointerRef.current;
			pointer.targetStrength = inside ? 1 : 0;
			if (inside) {
				pointer.targetX = ((localX / rect.width) * 2 - 1) * aspectRef.current;
				pointer.targetY = 1 - (localY / rect.height) * 2;
			}
		}

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		return () => window.removeEventListener("pointermove", onPointerMove);
	}, [elementRef, aspectRef]);

	return pointerRef;
}

export function easePointer(pointer: PointerState): void {
	pointer.x += (pointer.targetX - pointer.x) * FaceCanvasTune.pointer.ease;
	pointer.y += (pointer.targetY - pointer.y) * FaceCanvasTune.pointer.ease;
	pointer.strength +=
		(pointer.targetStrength - pointer.strength) *
		FaceCanvasTune.pointer.strengthEase;
}
