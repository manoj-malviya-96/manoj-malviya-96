type Patent = {
	title: string;
	field: string;
	year: number;
};

// TODO: confirm exact filed titles and years against the filings.
export const Patents: readonly Patent[] = [
	{
		title:
			"Adaptive Motion Compensation in Minimally Invasive Surgical Procedures",
		field: "Surgical robotics",
		year: 2022,
	},
	{
		title: "CAD Topology Optimization via Gradient Descent on Mesh Primitives",
		field: "Computational geometry",
		year: 2022,
	},
];
