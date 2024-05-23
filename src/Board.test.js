import { render } from "@testing-library/react";
import Board from "./Board";
// import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", () => {
  render(<Board />);
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn={1} />
  );
  expect(asFragment()).toMatchSnapshot();
});
