/* eslint-disable react/no-unknown-property */
import * as React from 'react';
import { SVGProps } from 'react';

type IconProps = {
  size?: number;
  fill?: string;
};

const SvgBriefcaseOutline = ({
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
      d="M9.33387 18.7311H14.6672C17.3472 18.7311 17.8272 17.6578 17.9672 16.3511L18.4672 11.0178C18.6472 9.39112 18.1805 8.06445 15.3339 8.06445H8.6672C5.82054 8.06445 5.35387 9.39112 5.53387 11.0178L6.03387 16.3511C6.17387 17.6578 6.65387 18.7311 9.33387 18.7311Z"
      stroke="#737373"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.33594 8.0651V7.53177C9.33594 6.35177 9.33594 5.39844 11.4693 5.39844H12.5359C14.6693 5.39844 14.6693 6.35177 14.6693 7.53177V8.0651"
      stroke="#737373"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.3307 12.7311V13.3978C13.3307 13.4045 13.3307 13.4045 13.3307 13.4111C13.3307 14.1378 13.3241 14.7311 11.9974 14.7311C10.6774 14.7311 10.6641 14.1445 10.6641 13.4178V12.7311C10.6641 12.0645 10.6641 12.0645 11.3307 12.0645H12.6641C13.3307 12.0645 13.3307 12.0645 13.3307 12.7311Z"
      stroke="#737373"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.4359 11.3984C16.8959 12.5184 15.1359 13.1851 13.3359 13.4118"
      stroke="#737373"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.75 11.5781C7.25 12.6048 8.94333 13.2248 10.67 13.4181"
      stroke="#737373"
      stroke-miterlimit="10"
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

export default SvgBriefcaseOutline;
