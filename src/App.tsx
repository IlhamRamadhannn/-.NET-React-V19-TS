import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

const container =
  document.getElementById("root");

if (!container) {
  throw new Error(
    "no container to render to"
  );
}

const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);