import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function TriangleIcon({ className, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className={className}
            {...props}
        >
            <path d="M12 4 22 20H2z" />
        </svg>
    );
}
