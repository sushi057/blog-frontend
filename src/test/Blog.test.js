import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

test("Blog is rendered", () => {
  const blog = {
    title: "testing",
    author: "jest",
    url: "facebook.github.io",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("testing jest");

  expect(element).toBeDefined();
});

test("Blog details show url and upvotes", async () => {
  const blog = {
    title: "url and upvotes",
    author: "jest",
    url: "example.com",
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const urlElement = screen.getByText("example.com");
  const upvoteElement = screen.getByText(0);

  expect(urlElement).toBeDefined();
  expect(upvoteElement).toBeDefined();
});

test("clicking button calls event handler twice", async () => {
  const blog = {
    title: "clicking buttons",
    author: "jest",
    url: "facebook.github.io",
  };

  const mockHandler = jest.fn();
  const user = userEvent.setup();

  render(<Blog blog={blog} handleUpvotes={mockHandler} />);

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const upvoteButton = screen.getByText("Upvote");

  await user.click(upvoteButton);
  await user.click(upvoteButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
  screen.debug(upvoteButton);
});
