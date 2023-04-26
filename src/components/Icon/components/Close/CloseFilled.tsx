import * as React from 'react';
import { SVGProps } from 'react';

type IconProps = {
  size?: number;
  fill?: string;
};

const SvgCloseFilled = ({
  size = 12,
  fill = '#171717',
  ...props
}: SVGProps<SVGSVGElement> & IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.66406 12.1693L7.33073 6.5026M7.33073 6.5026L12.5776 1.25569M7.33073 6.5026L1.66406 0.835938M7.33073 6.5026L12.9974 12.1693"
      stroke="#171717"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default SvgCloseFilled;
