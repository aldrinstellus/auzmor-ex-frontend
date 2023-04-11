import * as React from 'react';

export interface IAppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<IAppShellProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AppShell;
