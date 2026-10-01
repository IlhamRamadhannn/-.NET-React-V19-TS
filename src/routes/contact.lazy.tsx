import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import type { SubmitEvent } from "react";

import postContact from "../queries/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function getString(
  formData: FormData,
  key: string,
): string {
  const value = formData.get(key);

  return typeof value === "string"
    ? value
    : "";
}

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (
      e: SubmitEvent<HTMLFormElement>,
    ) {
      e.preventDefault();

      const formData = new FormData(e.target);

      return postContact(
        getString(formData, "name"),
        getString(formData, "email"),
        getString(formData, "message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>

      {mutation.isSuccess ? (
        <h3 className="m-12.5 text-center font-pacifico font-normal text-[30px] text-secondary">
          Submitted!
        </h3>
      ) : (
        <form
          className="flex flex-col items-center justify-items-center"
          onSubmit={mutation.mutate}
        >
          <input
            className="form-input my-3.75 w-full max-w-125 rounded-[5px] border-2 border-border p-2 focus:border-primary disabled:bg-[#999]"           name="name"
            placeholder="Name"
          />

          <input
            className="form-input my-3.75 w-full max-w-125 rounded-[5px] border-2 border-border p-2 focus:border-primary disabled:bg-[#999]"          type="email"
            name="email"
            placeholder="Email"
          />

          <textarea
            className="form-textarea my-3.75 w-full max-w-125 min-h-50 rounded-[5px] border-2 border-border p-2 focus:border-primary"            placeholder="Message"
            name="message"
          />

          <button
            className="btn">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}