import React, { useId } from 'react';
import { LucideIcon } from 'lucide-react';
import { COR_PRIMARIA, COR_SECUNDARIA } from '@/app/constants';

interface GradientIconProps {
  className?: string;
  Icon: LucideIcon;
}

const GradientIcon = ({
  Icon,
  className,
  ...props
}: GradientIconProps) => {
  const gradientId = useId(); // Generate a unique ID for the gradient

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      {/* Define the gradient with the unique ID */}
      <defs>
        <linearGradient id={gradientId} x1="100%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={'#000'} />
          <stop offset="100%" stopColor={COR_PRIMARIA} />
        </linearGradient>
      </defs>

      {/* Use the gradient in the stroke of the icon */}
      <Icon
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        {...props}
      />
    </svg>
  );
};

export default GradientIcon;
