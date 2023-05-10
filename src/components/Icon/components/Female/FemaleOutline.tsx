/* eslint-disable react/no-unknown-property */
import * as React from 'react';
import { SVGProps } from 'react';

type IconProps = {
  size?: number;
  fill?: string;
};

const SvgFemaleOutline = ({
  size = 24,
  fill = '#737373',
  ...props
}: SVGProps<SVGSVGElement> & IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="1.0625" width="23" height="23" rx="3.5" fill="#FAFAFA" />
    <path
      d="M12.0026 15.2298C14.5799 15.2298 16.6693 13.1405 16.6693 10.5632C16.6693 7.98582 14.5799 5.89648 12.0026 5.89648C9.42528 5.89648 7.33594 7.98582 7.33594 10.5632C7.33594 13.1405 9.42528 15.2298 12.0026 15.2298Z"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 15.2285V19.2285"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14 17.2285H10"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <rect x="0.5" y="1.0625" width="23" height="23" rx="3.5" stroke="#E5E5E5" />
  </svg>
);

export default SvgFemaleOutline;
