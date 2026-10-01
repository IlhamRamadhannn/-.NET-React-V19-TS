import { useState } from "react";
import {
  skipToken,
  useQuery,
} from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import getPastOrders from "../queries/getPastOrders";
import getPastOrder from "../queries/getPastOrder";

import Modal from "../Modal";
import ErrorBoundary from "../ErrorBoundary";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

function ErrorBoundaryWrappedPastOrderRoutes() {
  return (
    <ErrorBoundary>
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}

function PastOrdersRoute() {
  const [page, setPage] = useState(1);

  const [focusedOrder, setFocusedOrder] =
    useState<number>();

  const {
    isLoading,
    data,
  } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
  });

  const { data: pastOrderData } =
    useQuery({
      queryKey: ["past-order", focusedOrder],
      queryFn: focusedOrder
        ? () => getPastOrder(focusedOrder)
        : skipToken,
    });

  if (isLoading) {
    return (
      <div className="mx-auto min-h-[650px] w-[90%] max-w-225">
        <h2>LOADING …</h2>
      </div>
    );
  }

  if (!data) {
    throw new Error(
      "Past orders could not be loaded",
    );
  }

  return (
    <div className="mx-auto min-h-[650px] w-[90%] max-w-225">
      <table className="my-6.25 w-full min-w-100 border border-[#dddddd] border-collapse font-sans text-[0.9em]">
        <thead>
          <tr className="bg-secondary text-left text-white">
            <td className="px-3.75 py-3 text-center">
              ID
            </td>
            <td className="px-3.75 py-3 text-center">
              Date
            </td>
            <td className="px-3.75 py-3 text-center">
              Time
            </td>
          </tr>
        </thead>

        <tbody>
          {data.map((order) => (
            <tr
              key={order.order_id}
              className="border-b border-[#dddddd] even:bg-[#f6fef0] last:border-b-2 last:border-secondary"
            >
              <td className="px-3.75 py-3 text-center">
                <button
                  className="btn"
                  onClick={() =>
                    setFocusedOrder(
                      order.order_id,
                    )
                  }
                >
                  {order.order_id}
                </button>
              </td>

              <td className="px-3.75 py-3 text-center">
                {order.date}
              </td>

              <td className="px-3.75 py-3 text-center">
                {order.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-evenly">
        <button
          className="btn"
          disabled={page <= 1}
          onClick={() =>
            setPage(page - 1)
          }
        >
          Previous
        </button>

        <div className="font-pacifico text-[20px] text-primary">
          {page}
        </div>

        <button
          className="btn"
          disabled={data.length < 10}
          onClick={() =>
            setPage(page + 1)
          }
        >
          Next
        </button>
      </div>

      {focusedOrder ? (
        <Modal>
          <h2>
            Order #{focusedOrder}
          </h2>

          {pastOrderData ? (
            <table className="my-6.25 w-full min-w-100 border-collapse border border-[#dddddd] font-sans text-[0.9em]">
              <thead>
                <tr className="bg-secondary text-left text-white">
                  <td className="px-3.75 py-3 text-center">
                    Image
                  </td>
                  <td className="px-3.75 py-3 text-center">
                    Name
                  </td>
                  <td className="px-3.75 py-3 text-center">
                    Size
                  </td>
                  <td className="px-3.75 py-3 text-center">
                    Quantity
                  </td>
                  <td className="px-3.75 py-3 text-center">
                    Price
                  </td>
                  <td className="px-3.75 py-3 text-center">
                    Total
                  </td>
                </tr>
              </thead>

              <tbody>
                {pastOrderData.orderItems.map(
                  (pizza) => (
                    <tr
                      key={`${pizza.pizzaTypeId}_${pizza.size}`}
                      className="border-b border-[#dddddd] even:bg-[#f6fef0] last:border-b-2 last:border-secondary"
                    >
                      <td className="px-3.75 py-3 text-center">
                        <img
                          className="w-12.5"
                          src={pizza.image}
                          alt={pizza.name}
                        />
                      </td>

                      <td className="px-3.75 py-3 text-center">
                        {pizza.name}
                      </td>

                      <td className="px-3.75 py-3 text-center">
                        {pizza.size}
                      </td>

                      <td className="px-3.75 py-3 text-center">
                        {pizza.quantity}
                      </td>

                      <td className="px-3.75 py-3 text-center">
                        {intl.format(
                          pizza.price,
                        )}
                      </td>

                      <td className="px-3.75 py-3 text-center">
                        {intl.format(
                          pizza.total,
                        )}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          ) : (
            <p>Loading …</p>
          )}

          <button
            className="btn"
            onClick={() =>
              setFocusedOrder(undefined)
            }
          >
            Close
          </button>
        </Modal>
      ) : null}
    </div>
  );
}