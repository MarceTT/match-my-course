"use client";

import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";

const client = new QueryClient();

type Props = {
  children: ReactNode;
  state?: DehydratedState;
};

export default function ReactQueryProvider({ children, state }: Props) {
  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
