import type { FaceMesh, SerializedFaceMesh } from "./types";

export function serializeFaceMesh(mesh: FaceMesh): SerializedFaceMesh {
	return {
		positions: Array.from(mesh.positions),
		brightness: Array.from(mesh.brightness),
		edgeIndices: Array.from(mesh.edgeIndices),
		vertexCount: mesh.vertexCount,
		edgeCount: mesh.edgeCount,
	};
}

export function deserializeFaceMesh(data: SerializedFaceMesh): FaceMesh {
	return {
		positions: Float32Array.from(data.positions),
		brightness: Float32Array.from(data.brightness),
		edgeIndices: Uint32Array.from(data.edgeIndices),
		vertexCount: data.vertexCount,
		edgeCount: data.edgeCount,
	};
}
