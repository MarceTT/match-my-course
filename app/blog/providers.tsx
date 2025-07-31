"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";

const client = new QueryClient();

export default function ReactQueryProvider({
  children,
  state,
}: {
  children: ReactNode;
  state?: unknown;
}) {
  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}