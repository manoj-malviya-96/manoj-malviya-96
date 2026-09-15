import { Flex } from "@manoj-malviya-96/atom";
import { type ReactNode, useId } from "react";

export function MacbookMockup({ children }: { children: ReactNode }) {
	const uid = useId();

	return (
		<Flex direction="col" hAlign="center" width="lg">
			<svg
				viewBox="0 0 1717 1027"
				width="100%"
				role="img"
				aria-label="MacBook mockup"
			>
				<title>MacBook frame</title>
				<g clipPath={`url(#clip0-${uid})`}>
					<path
						d="M0 969.373H1716.47V1002.3C1716.47 1015.94 1705.41 1027 1691.77 1027H24.6974C11.0574 1027 0 1015.94 0 1002.3V969.373Z"
						fill={`url(#paint0-${uid})`}
					/>
					<rect
						width="1716.47"
						height="41.1623"
						transform="translate(0 969.373)"
						fill="#A3ACB1"
					/>
					<rect
						width="1716.47"
						height="41.1623"
						transform="translate(0 969.373)"
						fill={`url(#paint1-${uid})`}
					/>
					<rect
						width="1716.47"
						height="57.6273"
						transform="translate(0 969.373)"
						fill={`url(#paint2-${uid})`}
					/>
					<path
						d="M730.631 969.373H985.838C985.838 983.013 974.78 994.07 961.14 994.07H755.329C741.689 994.07 730.631 983.013 730.631 969.373Z"
						fill="#676D70"
					/>
					<path
						d="M730.631 969.373H985.838C985.838 983.013 974.78 994.07 961.14 994.07H755.329C741.689 994.07 730.631 983.013 730.631 969.373Z"
						fill={`url(#paint3-${uid})`}
					/>
				</g>
				<g clipPath={`url(#clip1-${uid})`}>
					<foreignObject
						x="117.313"
						y="19.5521"
						width="1481.84"
						height="909.687"
					>
						<div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
							{children}
						</div>
					</foreignObject>
					<mask id={`path-3-inside-1-${uid}`} fill="white">
						<path d="M98.7896 28.8136C98.7896 12.9003 111.69 3.05176e-05 127.603 3.05176e-05H1588.87C1604.78 3.05176e-05 1617.68 12.9003 1617.68 28.8137V969.373H98.7896V28.8136Z" />
					</mask>
					<rect
						width="1518.89"
						height="28.8136"
						transform="translate(98.7895 940.559)"
						fill="#1E1F1F"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M127.603 3.05176e-05C111.69 3.05176e-05 98.7896 12.9003 98.7896 28.8137V940.559H1617.68V28.8137C1617.68 12.9003 1604.78 3.05176e-05 1588.87 3.05176e-05H127.603ZM784.142 19.5521H791.346H925.123H932.327H938.501H1584.75C1592.71 19.5521 1599.16 26.0023 1599.16 33.9589V908.658C1599.16 916.615 1592.71 923.065 1584.75 923.065H131.719C123.763 923.065 117.313 916.615 117.313 908.658V33.9589C117.313 26.0023 123.763 19.5521 131.719 19.5521H777.968H784.142Z"
						fill="black"
					/>
				</g>
				<path
					d="M97.7606 28.8137C97.7606 12.332 111.122 -1.02903 127.603 -1.02903H1588.87C1605.35 -1.02903 1618.71 12.332 1618.71 28.8137H1616.65C1616.65 13.4687 1604.21 1.02909 1588.87 1.02909H127.603C112.258 1.02909 99.8187 13.4687 99.8187 28.8137H97.7606ZM1617.68 969.373H98.7896H1617.68ZM97.7606 969.373V28.8137C97.7606 12.332 111.122 -1.02903 127.603 -1.02903V1.02909C112.258 1.02909 99.8187 13.4687 99.8187 28.8137V969.373H97.7606ZM1588.87 -1.02903C1605.35 -1.02903 1618.71 12.332 1618.71 28.8137V969.373H1616.65V28.8137C1616.65 13.4687 1604.21 1.02909 1588.87 1.02909V-1.02903Z"
					fill="#7A7B7D"
					mask={`url(#path-3-inside-1-${uid})`}
				/>
				<defs>
					<linearGradient
						id={`paint0-${uid}`}
						x1="858.234"
						y1="1015.68"
						x2="858.234"
						y2="927.181"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#4F4F51" />
						<stop offset="1" stopColor="#4F4F51" stopOpacity="0" />
					</linearGradient>
					<linearGradient
						id={`paint1-${uid}`}
						x1="0"
						y1="0"
						x2="1716.47"
						y2="2.68512e-06"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#242729" />
						<stop offset="0.0103499" stopColor="#9CA3A8" />
						<stop offset="0.0193345" stopColor="#242729" />
						<stop offset="0.133609" stopColor="#5E6366" />
						<stop offset="0.865967" stopColor="#5C6163" />
						<stop offset="0.980306" stopColor="#242729" />
						<stop offset="0.990459" stopColor="#9BA3A8" />
						<stop offset="0.996436" stopColor="#242729" />
					</linearGradient>
					<linearGradient
						id={`paint2-${uid}`}
						x1="858.235"
						y1="41.6769"
						x2="858.234"
						y2="-1.42996e-06"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#343638" />
						<stop offset="0.386056" stopColor="#4F4F51" stopOpacity="0.25" />
						<stop offset="1" stopColor="#4F4F51" stopOpacity="0" />
					</linearGradient>
					<linearGradient
						id={`paint3-${uid}`}
						x1="730.631"
						y1="981.722"
						x2="985.838"
						y2="981.722"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#0D1012" />
						<stop offset="0.294899" stopColor="#5E6366" stopOpacity="0" />
						<stop offset="0.704677" stopColor="#5E6366" stopOpacity="0" />
						<stop offset="0.996436" stopColor="#0D1012" />
					</linearGradient>
					<clipPath id={`clip0-${uid}`}>
						<path
							d="M0 969.373H1716.47V1002.3C1716.47 1015.94 1705.41 1027 1691.77 1027H24.6974C11.0574 1027 0 1015.94 0 1002.3V969.373Z"
							fill="white"
						/>
					</clipPath>
					<clipPath id={`clip1-${uid}`}>
						<path
							d="M98.7896 28.8136C98.7896 12.9003 111.69 3.05176e-05 127.603 3.05176e-05H1588.87C1604.78 3.05176e-05 1617.68 12.9003 1617.68 28.8137V969.373H98.7896V28.8136Z"
							fill="white"
						/>
					</clipPath>
				</defs>
			</svg>
		</Flex>
	);
}
