import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

test("Creates blog with correct details", async () => {
  const mockHandler = jest.fn();

  render(<BlogForm createBlog={mockHandler} />);

  const createButton = screen.getByText("Create blog");
  const titleInput = screen.getByPlaceholderText("Blog Title");
  const urlInput = screen.getByPlaceholderText("Blog Url");

  await userEvent.type(titleInput, "esta es blog title");
  await userEvent.type(urlInput, "esta es blog url");
  await userEvent.click(createButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  console.log(mockHandler.mock.calls);
  expect(mockHandler.mock.calls[0][0].title).toBe("esta es blog title");
  expect(mockHandler.mock.calls[0][0].url).toBe("esta es blog url");
});
