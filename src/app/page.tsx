"use client";

import Contracts from "@/components/Contracts/Contracts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {

  const queryClient = new QueryClient();

  return (
    <div className="app grid place-items-center">
      <QueryClientProvider client={queryClient}>
        <Contracts />
      </QueryClientProvider>
    </div>
  );
}
