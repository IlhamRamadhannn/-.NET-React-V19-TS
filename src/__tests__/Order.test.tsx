import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";  
import { Route } from "../routes/order.lazy";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "../store";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("loads pizza types from api", async () => {
  fetchMocker.mockResponse(
    JSON.stringify([
      {
        id: "pepperoni",
        name: "Pepperoni",
        description:
          "A classic pizza topped with pepperoni slices.",
        image: "https://picsum.photos/200",
        sizes: {
          S: 15,
          M: 20,
          L: 25,
        },
      },
    ]),
  );

  const OrderRoute =
    Route.options.component;

  if (!OrderRoute) {
    throw new Error(
      "order route has no component",
    );
  }

  const store = makeStore();

  render(
    <Provider store={store}>
      <OrderRoute />
    </Provider>,
  );

  await waitFor(() => {
    expect(
      screen.getAllByText("Pepperoni").length,
    ).toBeGreaterThan(0);
  });

const requests = fetchMocker.requests();

expect(requests.length).toBe(1);

const request = requests[0];

if (!request) {
  throw new Error("No request found");
}

expect(request.url).toContain(
  "/api/pizzas",
);

});