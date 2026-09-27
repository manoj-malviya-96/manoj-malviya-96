type Patent = {
	title: string;
	field: string;
	year: number;
};

// TODO: confirm exact filed title and year against the filing.
export const Patents: readonly Patent[] = [
	{
		title: "CAD Topology Optimization via Gradient Descent on Mesh Primitives",
		field: "Computational geometry",
		year: 2022,
	},
];
