/* eslint-disable react/no-unknown-property */
import * as React from 'react';
import { SVGProps } from 'react';

type IconProps = {
  size?: number;
  fill?: string;
};

const SvgCakeOutline = ({
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
      d="M5.33594 19.2285H18.6693"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.07031 19.2285V13.2285C6.07031 12.1218 7.06365 11.2285 8.29031 11.2285H15.697C16.9236 11.2285 17.917 12.1218 17.917 13.2285V19.2285"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.70312 11.2298V9.34315C7.70312 8.54315 8.42312 7.89648 9.31646 7.89648H14.6831C15.5698 7.89648 16.2898 8.54315 16.2898 9.34315V11.2298"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.35156 13.8828L6.59823 13.8895C7.09156 13.8961 7.4849 14.2961 7.4849 14.7895V15.0095C7.4849 15.5028 7.8849 15.9095 8.3849 15.9095C8.87823 15.9095 9.2849 15.5095 9.2849 15.0095V14.8028C9.2849 14.3095 9.6849 13.9028 10.1849 13.9028C10.6782 13.9028 11.0849 14.3028 11.0849 14.8028V15.0095C11.0849 15.5028 11.4849 15.9095 11.9849 15.9095C12.4782 15.9095 12.8849 15.5095 12.8849 15.0095V14.8028C12.8849 14.3095 13.2849 13.9028 13.7849 13.9028C14.2782 13.9028 14.6849 14.3028 14.6849 14.8028V15.0095C14.6849 15.5028 15.0849 15.9095 15.5849 15.9095C16.0782 15.9095 16.4849 15.5095 16.4849 15.0095V14.8028C16.4849 14.3095 16.8849 13.9028 17.3849 13.9028H17.6849"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.33594 7.89583V6.5625"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.6641 7.89583V6.5625"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 7.89648V5.89648"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <rect x="0.5" y="1.0625" width="23" height="23" rx="3.5" stroke="#E5E5E5" />
  </svg>
);

export default SvgCakeOutline;
