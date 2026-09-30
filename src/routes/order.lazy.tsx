import Pizza from "../Pizza";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts";
import Cart from "../Cart";
import { createLazyFileRoute } from "@tanstack/react-router";

// BEFORE
// import type { PizzaSize } from "../APIResponsesTypes";

// AFTER
import type {
  Pizza as PizzaType,
  PizzaSize,
} from "../APIResponsesTypes";

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

function Order() {
  const [pizzaType, setPizzaType] =
    useState("pepperoni");

  const [pizzaSize, setPizzaSize] =
    useState<PizzaSize>("M");

  // BEFORE
  // const [pizzaTypes, setPizzaTypes] = useState([]);

  // AFTER
  const [pizzaTypes, setPizzaTypes] =
    useState<PizzaType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [cart, setCart] =
    useContext(CartContext);

  const intl = new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  );

  // BEFORE
  // let price, selectedPizza;

  // AFTER
  let price: string | undefined;
  let selectedPizza:
    | PizzaType
    | undefined;

  if (!loading) {
    selectedPizza =
      pizzaTypes.find(
        (pizza) =>
          pizzaType === pizza.id
      );

    // BEFORE
    // price = intl.format(
    //   selectedPizza.sizes[pizzaSize]
    // );

    // AFTER
    price = selectedPizza
      ? intl.format(
          selectedPizza.sizes[pizzaSize]
        )
      : undefined;
  }

  useEffect(() => {
    // BEFORE
    // fetchPizzaTypes();

    // AFTER
    void fetchPizzaTypes();
  }, []);

  async function fetchPizzaTypes() {
    // await new Promise(
    //   (resolve) =>
    //     setTimeout(resolve, 3000)
    // );

    const pizzasRes =
      await fetch("/api/pizzas");

    // BEFORE
    // const pizzasJson =
    //   await pizzasRes.json();

    // AFTER
    const pizzasJson =
      (await pizzasRes.json()) as PizzaType[];

    setPizzaTypes(pizzasJson);
    setLoading(false);
  }

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });

    setCart([]);
    setLoading(false);
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            // AFTER
            if (
              !selectedPizza ||
              !price
            ) {
              return;
            }

            setCart([
              ...cart,
              {
                pizza:
                  selectedPizza,
                size:
                  pizzaSize,
                price,
              },
            ]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">
                Pizza Type
              </label>

              <select
                onChange={(e) =>
                  setPizzaType(
                    e.target.value
                  )
                }
                name="pizza-type"
                value={pizzaType}
              >
                {pizzaTypes.map(
                  (pizza) => (
                    <option
                      key={pizza.id}
                      value={
                        pizza.id
                      }
                    >
                      {pizza.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label htmlFor="pizza-size">
                Pizza Size
              </label>

              <div
                onChange={(e) =>
                  setPizzaSize(
                    (e.target as HTMLInputElement)
                      .value as PizzaSize
                  )
                }
              >
                <span>
                  <input
                    checked={
                      pizzaSize ===
                      "S"
                    }
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                  />
                  <label htmlFor="pizza-s">
                    Small
                  </label>
                </span>

                <span>
                  <input
                    checked={
                      pizzaSize ===
                      "M"
                    }
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                  />
                  <label htmlFor="pizza-m">
                    Medium
                  </label>
                </span>

                <span>
                  <input
                    checked={
                      pizzaSize ===
                      "L"
                    }
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                  />
                  <label htmlFor="pizza-l">
                    Large
                  </label>
                </span>
              </div>
            </div>

            <button type="submit">
              Add to Cart
            </button>
          </div>

          {/* BEFORE */}
          {/* {loading ? ( */}

          {/* AFTER */}
          {loading ||
          !selectedPizza ? (
            <h3>Loading...</h3>
          ) : (
            <div className="order-pizza">
              <Pizza
                name={
                  selectedPizza.name
                }
                description={
                  selectedPizza.description
                }
                image={
                  selectedPizza.image
                }
              />
              <p>{price}</p>
            </div>
          )}
        </form>
      </div>

      {loading ? (
        <h2>LOADING …</h2>
      ) : (
        <Cart
          // BEFORE
          // checkout={checkout}

          // AFTER
          checkout={() =>
            void checkout()
          }
          cart={cart}
        />
      )}
    </div>
  );
}