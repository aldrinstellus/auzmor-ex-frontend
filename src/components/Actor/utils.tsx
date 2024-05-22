export function convertUserTags(input: string) {
  return input.replace(
    /\{Userid:(\d+)\|([^}]+)\}/g,
    ':user{userId="$1" name="$2"}',
  );
}

export const CustomStrong = ({ children, className, ...props }: any) => {
  return (
    <strong
      className={`${className} font-bold text-sm text-neutral-900  hover:cursor-pointer`}
      {...props}
    >
      {children}
    </strong>
  );
};

export const CustomLink = ({ children, className, ...props }: any) => {
  return (
    <a
      className={`${className} font-bold text-sm text-primary-500 hover:text-primary-700 hover:cursor-pointer`}
      target="_blank"
      {...props}
    >
      {children}
    </a>
  );
};
