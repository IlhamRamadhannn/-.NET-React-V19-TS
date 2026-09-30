import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { CartContext } from "../contexts";
import { Route } from "../routes/order.lazy";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

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

  render(
    <CartContext.Provider
      value={[[], vi.fn()]}
    >
      <OrderRoute />
    </CartContext.Provider>,
  );

  await waitFor(() => {
    expect(
      screen.getAllByText("Pepperoni").length,
    ).toBeGreaterThan(0);
  });

  expect(fetchMocker).toHaveBeenCalledWith(
    "/api/pizzas",
  );
});