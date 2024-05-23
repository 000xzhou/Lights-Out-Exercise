import { render } from "@testing-library/react";
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
