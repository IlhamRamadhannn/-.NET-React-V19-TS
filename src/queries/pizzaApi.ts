import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PastOrder, PastOrderDetail, Pizza } from "../APIResponsesTypes";
import type { CartItem } from "../cartSlice";


export const pizzaApi = createApi({
    reducerPath: "pizzaApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["PastOrders"],
    endpoints: (build) => ({
        getPizzas: build.query<Pizza[], void>({
            query: () => "pizzas",
        }),
        getPastOrder: build.query<PastOrderDetail, number>({
            query: (order) => `past-order/${order}`,
            keepUnusedDataFor: 24 * 60 *60, // 24 hours
        }),
        getPastOrders: build.query<PastOrder[], number>({
        query: (page) => `past-orders?page=${page}`,
        providesTags: ["PastOrders"],
        }),
        getPizzaOfTheDay: build.query<Pizza, void>({
        query: () => "pizza-of-the-day",
        }),

        postContact: build.mutation<unknown, { name: string; email: string; message: string }>({
            query: (contact) => ({
                url: "contact",
                method: "POST",
                body: contact,
            }),
        }),
        placeOrder: build.mutation<unknown, CartItem[]>({
        query: (cart) => ({
            url: "order",
            method: "POST",
            body: { cart },
        }),
        
        invalidatesTags: ["PastOrders"],
    }),
  }),
});

export const { useGetPizzasQuery, useGetPastOrdersQuery, useGetPastOrderQuery, usePlaceOrderMutation, useGetPizzaOfTheDayQuery, usePostContactMutation } = pizzaApi;

