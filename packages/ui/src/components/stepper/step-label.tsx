import { cn } from "../../utils";
import { cva } from "class-variance-authority";
import { useStepper } from "./use-stepper";

interface StepLabelProps {
	isCurrentStep?: boolean;
	opacity: number;
	label?: string | React.ReactNode;
	description?: string | null;
}

const labelVariants = cva("", {
	variants: {
		size: {
			sm: "text-sm",
			md: "text-sm",
			lg: "text-base",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const descriptionVariants = cva("", {
	variants: {
		size: {
			sm: "text-xs",
			md: "text-xs",
			lg: "text-sm",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const StepLabel = ({
	isCurrentStep,
	opacity,
	label,
	description,
}: StepLabelProps) => {
	const { variant, styles, size, orientation } = useStepper();
	const shouldRender = !!label || !!description;

	return shouldRender ? (
		<div
			aria-current={isCurrentStep ? "step" : undefined}
			className={cn(
				"stepper__step-label-container",
				"flex-col flex",
				variant !== "line" ? "ms-2" : orientation === "horizontal" && "my-2",
				variant === "circle-alt" && "text-center",
				variant === "circle-alt" && orientation === "horizontal" && "ms-0",
				variant === "circle-alt" && orientation === "vertical" && "text-start",
				styles?.["step-label-container"],
			)}
			style={{
				opacity,
			}}
		>
			{!!label && (
				<span
					className={cn(
						"stepper__step-label",
						labelVariants({ size }),
						styles?.["step-label"],
					)}
				>
					{label}
				</span>
			)}
			{!!description && (
				<span
					className={cn(
						"stepper__step-description",
						"text-muted-foreground",
						descriptionVariants({ size }),
						styles?.["step-description"],
					)}
				>
					{description}
				</span>
			)}
		</div>
	) : null;
};

export { StepLabel };