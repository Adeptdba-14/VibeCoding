import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

const fill = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/full name/i), "Ada Lovelace");
  await user.type(screen.getByLabelText(/work email/i), "ada@example.com");
  await user.type(screen.getByLabelText(/environment and goals/i), "We need help with PostgreSQL HA.");
};

describe("ContactForm", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("shows validation errors and does not submit when empty", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/tell us your name/i)).toBeInTheDocument();
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/10\+ characters/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("pre-selects the default service and toggles service chips", async () => {
    const user = userEvent.setup();
    render(<ContactForm defaultService="training" />);
    const training = screen.getByRole("button", { name: /training & enablement/i });
    expect(training).toHaveAttribute("aria-pressed", "true");
    await user.click(training);
    expect(training).toHaveAttribute("aria-pressed", "false");
  });

  it("posts the enquiry and shows a confirmation", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /^database administration$/i }));
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/message received/i)).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ name: "Ada Lovelace", email: "ada@example.com", services: ["database-administration"] });
  });

  it("shows an error when the server fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
  });
});
