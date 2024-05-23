import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";
// import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", () => {
  render(<Board />);
});

it("matches snapshot", function () {
  // Override the random method to always return 0.3.
  const mockMath = Object.create(global.Math);
  mockMath.random = jest.fn(() => 0.3);
  global.Math = mockMath;

  const { asFragment } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn={0.5} />
  );

  expect(asFragment()).toMatchSnapshot();

  // Restore the original Math.random
  global.Math = mockMath;
});

it("flips the right cells", function () {
  // Override the random method to always return 0.8. (all will be not lit)
  const mockMath = Object.create(global.Math);
  mockMath.random = jest.fn(() => 0.8);
  global.Math = mockMath;

  const { container } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn={0.5} />
  );

  let cells = container.querySelectorAll(".Cell");
  fireEvent.click(cells[4]);
  console.log(cells[0].classList.contains("Cell-lit"));

  // is the cell and it's neighbors lit?
  expect(cells[4].classList.contains("Cell-lit")).toBe(true);
  // up
  expect(cells[1].classList.contains("Cell-lit")).toBe(true);
  // left
  expect(cells[3].classList.contains("Cell-lit")).toBe(true);
  // right
  expect(cells[5].classList.contains("Cell-lit")).toBe(true);
  // down
  expect(cells[7].classList.contains("Cell-lit")).toBe(true);

  // is the rest unlit?
  expect(cells[0].classList.contains("Cell-lit")).toBe(false);
  expect(cells[2].classList.contains("Cell-lit")).toBe(false);
  expect(cells[4].classList.contains("Cell-lit")).toBe(false);
  expect(cells[6].classList.contains("Cell-lit")).toBe(false);
  expect(cells[8].classList.contains("Cell-lit")).toBe(false);

  // Restore the original Math.random
  global.Math = mockMath;
});

it("checking for a win and showing a “You won!” message.", function () {
  // Override the random method to always return 0.3 (always lit, always winner)
  const mockMath = Object.create(global.Math);
  mockMath.random = jest.fn(() => 0.3);
  global.Math = mockMath;

  const { queryByText } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn={0.5} />
  );

  const winner = queryByText("You won!");
  expect(winner).toBeInTheDocument();

  // Restore the original Math.random
  global.Math = mockMath;
});
