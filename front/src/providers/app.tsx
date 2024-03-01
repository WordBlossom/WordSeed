"use client";

import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import RNListener from "./react-native-listener";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RNListener>
        <ReactQueryDevtools />
        {children}
      </RNListener>
    </QueryClientProvider>
  );
};