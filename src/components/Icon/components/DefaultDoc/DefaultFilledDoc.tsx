import { SVGProps } from 'react';

const SvgDefaultDocFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="32"
    fill="none"
    {...props}
    viewBox="0 0 24 32"
  >
    <path
      fill="#A3A3A3"
      fillRule="evenodd"
      d="M24 8.421v21.053C24 30.869 22.888 32 21.517 32H2.483C1.11 32 0 30.869 0 29.474V2.526C0 1.131 1.111 0 2.483 0h13.24L24 8.421z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#E5E5E5"
      fillRule="evenodd"
      d="M24 8.137v1.048h-6.766c-1.4 0-2.047-1.16-2.047-2.59V.188h1.025L24 8.136z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default SvgDefaultDocFilled;
