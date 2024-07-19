"use client";

import { cn } from "../../utils"
import * as React from "react";
import { StepperProvider } from "./context";
import { Step } from "./step";
import type { StepItem, StepProps, StepperProps } from "./types";
import { useMediaQuery } from "./use-media-query";
import { useStepper } from "./use-stepper";

const VARIABLE_SIZES = {
	sm: "36px",
	md: "40px",
	lg: "44px",
};

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
	(props, ref: React.Ref<HTMLDivElement>) => {
		const {
			className,
			children,
			orientation: orientationProp,
			state,
			responsive,
			checkIcon,
			errorIcon,
			onClickStep,
			mobileBreakpoint,
			expandVerticalSteps = false,
			initialStep = 0,
			size,
			steps,
			variant,
			styles,
			variables,
			scrollTracking = false,
			...rest
		} = props;

		const childArr = React.Children.toArray(children);

		const items = [] as React.ReactElement[];

		const footer = childArr.map((child, _index) => {
			if (!React.isValidElement(child)) {
				throw new Error("Stepper children must be valid React elements.");
			}
			if (child.type === Step) {
				items.push(child);
				return null;
			}

			return child;
		});

		const stepCount = items.length;

		const isMobile = useMediaQuery(
			`(max-width: ${mobileBreakpoint || "768px"})`,
		);

		const clickable = !!onClickStep;

		const orientation = isMobile && responsive ? "vertical" : orientationProp;

		const isVertical = orientation === "vertical";

		return (
			<StepperProvider
				value={{
					initialStep,
					orientation,
					state,
					size,
					responsive,
					checkIcon,
					errorIcon,
					onClickStep,
					clickable,
					stepCount,
					isVertical,
					variant: variant || "circle",
					expandVerticalSteps,
					steps,
					scrollTracking,
					styles,
				}}
			>
				<div
					ref={ref}
					className={cn(
						"stepper__main-container",
						"flex w-full flex-wrap",
						stepCount === 1 ? "justify-end" : "justify-between",
						orientation === "vertical" ? "flex-col" : "flex-row",
						variant === "line" && orientation === "horizontal" && "gap-4",
						className,
						styles?.["main-container"],
					)}
					style={
						{
							"--step-icon-size":
								variables?.["--step-icon-size"] ||
								`${VARIABLE_SIZES[size || "md"]}`,
							"--step-gap": variables?.["--step-gap"] || "8px",
						} as React.CSSProperties
					}
					{...rest}
				>
					<VerticalContent>{items}</VerticalContent>
				</div>
				{orientation === "horizontal" && (
					<HorizontalContent>{items}</HorizontalContent>
				)}
				{footer}
			</StepperProvider>
		);
	},
);

Stepper.defaultProps = {
	size: "md",
	orientation: "horizontal",
	responsive: true,
};

const VerticalContent = ({ children }: { children: React.ReactNode }) => {
	const { activeStep } = useStepper();

	const childArr = React.Children.toArray(children);
	const stepCount = childArr.length;

	return (
		<>
			{React.Children.map(children, (child, i) => {
				const isCompletedStep =
					(React.isValidElement(child) &&
						(child.props as any).isCompletedStep) ??
					i < activeStep;
				const isLastStep = i === stepCount - 1;
				const isCurrentStep = i === activeStep;

				const stepProps = {
					index: i,
					isCompletedStep,
					isCurrentStep,
					isLastStep,
				};

				if (React.isValidElement(child)) {
					return React.cloneElement(child, stepProps);
				}
				return null;
			})}
		</>
	);
};

const HorizontalContent = ({ children }: { children: React.ReactNode }) => {
	const { activeStep } = useStepper();
	const childArr = React.Children.toArray(children);

	if (activeStep > childArr.length) {
		return null;
	}

	return (
		<>
			{React.Children.map(childArr[activeStep], (node) => {
				if (!React.isValidElement(node)) {
					return null;
				}
				return React.Children.map(
					node.props.children,
					(childNode) => childNode,
				);
			})}
		</>
	);
};

export { Stepper, Step, useStepper };
export type { StepProps, StepperProps, StepItem };