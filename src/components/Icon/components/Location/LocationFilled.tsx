/* eslint-disable react/no-unknown-property */
import * as React from 'react';
import { SVGProps } from 'react';

type IconProps = {
  size?: number;
  fill?: string;
};

const SvgLocationOutline = ({
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
    <path
      d="M12.0039 13.3965C13.1085 13.3965 14.0039 12.5011 14.0039 11.3965C14.0039 10.2919 13.1085 9.39648 12.0039 9.39648C10.8993 9.39648 10.0039 10.2919 10.0039 11.3965C10.0039 12.5011 10.8993 13.3965 12.0039 13.3965Z"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.7765 15.1689L12.9479 17.9976C12.6979 18.2474 12.3589 18.3876 12.0055 18.3876C11.6522 18.3876 11.3132 18.2474 11.0632 17.9976L8.23388 15.1689C7.48802 14.423 6.9801 13.4727 6.77434 12.4382C6.56857 11.4036 6.6742 10.3313 7.07788 9.35675C7.48155 8.38222 8.16514 7.54929 9.0422 6.96326C9.91925 6.37724 10.9504 6.06445 12.0052 6.06445C13.06 6.06445 14.0912 6.37724 14.9682 6.96326C15.8453 7.54929 16.5289 8.38222 16.9325 9.35675C17.3362 10.3313 17.4419 11.4036 17.2361 12.4382C17.0303 13.4727 16.5224 14.423 15.7765 15.1689Z"
      stroke="#737373"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <rect
      x="0.5"
      y="0.564453"
      width="23"
      height="23"
      rx="7.5"
      stroke="#E5E5E5"
    />
  </svg>
);

export default SvgLocationOutline;
