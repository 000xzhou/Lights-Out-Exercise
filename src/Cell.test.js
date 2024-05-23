import { render } from "@testing-library/react";
import Cell from "./Cell";
// import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", () => {
  render(<Cell />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Cell />);
  expect(asFragment()).toMatchSnapshot();
});
