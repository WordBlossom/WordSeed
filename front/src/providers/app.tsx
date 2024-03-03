"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "@/lib/react-query";
import RNListener from "./react-native-listener";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RNListener>
        <ReactQueryDevtools />
        {children}
      </RNListener>
    </QueryClientProvider>
  );
};
