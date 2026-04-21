
import { render, screen, fireEvent } from "@testing-library/react"
import App from "../App"


test("TC1: renders products", () => {
  render(<App />)
  expect(screen.getByText("Product 1")).toBeInTheDocument()
})

test("TC2: add to cart", () => {
  render(<App />)
  fireEvent.click(screen.getAllByText("Add to Cart")[0])
  expect(screen.getByText("Cart: 1")).toBeInTheDocument()
})

test("TC3: cart count visible", () => {
  render(<App />)
  expect(screen.getByText(/Cart:/)).toBeInTheDocument()
})

test("TC4: increase qty", () => {
  render(<App />)
  fireEvent.click(screen.getAllByText("Add to Cart")[0])
  fireEvent.click(screen.getByText("+"))
  expect(screen.getByText("Qty: 2")).toBeInTheDocument()
})

test("TC5: remove item", () => {
  render(<App />)
  fireEvent.click(screen.getAllByText("Add to Cart")[0])
  fireEvent.click(screen.getByText("Remove"))
  expect(screen.getByText("Cart: 0")).toBeInTheDocument()
})

test("TC6: total calculation", () => {
  render(<App />)
  fireEvent.click(screen.getAllByText("Add to Cart")[0])
  expect(screen.getByText(/Total:/)).toBeInTheDocument()
})
