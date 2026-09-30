import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import Cart from "../Cart";
import type { CartItem } from "../contexts";

afterEach(cleanup);

test("renders cart items", () => {
  const testPizza = {
    id: "pepperoni",
    name: "Pepperoni",
    category: "Classic",
    description: "Mozzarella Cheese, Pepperoni",
    image: "/public/pizzas/pepperoni.webp",
    sizes: {
      S: 15,
      M: 20,
      L: 25,
    },
  };

  const cart: CartItem[] = [
    {
      size: "M",
      pizza: testPizza,
      price: "20",
    },
  ];

  render(
    <Cart
      cart={cart}
      checkout={() => {}}
    />,
  );

  expect(
    screen.getByText("Pepperoni"),
  ).toBeTruthy();

  expect(
    screen.getByText("M"),
  ).toBeTruthy();
});

test("renders total price", () => {
  const testPizza = {
    id: "pepperoni",
    name: "Pepperoni",
    category: "Classic",
    description: "Mozzarella Cheese, Pepperoni",
    image: "/public/pizzas/pepperoni.webp",
    sizes: {
      S: 15,
      M: 20,
      L: 25,
    },
  };

  const cart: CartItem[] = [
    {
      size: "M",
      pizza: testPizza,
      price: "20",
    },
  ];

  render(
    <Cart
      cart={cart}
      checkout={() => {}}
    />,
  );

  expect(
    screen.getByText("Total: $20.00"),
  ).toBeTruthy();
});