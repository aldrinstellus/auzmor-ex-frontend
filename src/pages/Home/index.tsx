import { QueryClient } from '@tanstack/react-query';
import React from 'react';

interface IHomeProps {}

// ⬇️ loader query definition (takes argument as query client)
// ⬇️ replace any with relevant API types
export const loader = (queryClient: QueryClient) => async (): Promise<any> => {
  // ⬇️ return react-query client store cache (ensureQueryData)
};

const Home: React.FC<IHomeProps> = () => {
  // ⬇️ use hook to get the data from react query client using useQuery
  // ⬇️ use hook to get the data after router loads (useLoaderData)
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-bold">Home Page</div>
    </div>
  );
};

export default Home;
