"use client";

import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Wrapper;
