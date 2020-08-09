import { render, fireEvent } from "@testing-library/react";
import { Switch } from "./Switch";

describe("Tests for Switch component", () => {
  it("should render with a toggle button", () => {
    const { findByTestId, container } = render(
      <Switch value={false} onToggle={() => null} />
    );
    expect(findByTestId("switchButton")).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it("should invoke passed toggle function on click", async () => {
    const onToggle = jest.fn();
    const { findByTestId } = render(
      <Switch value={false} onToggle={onToggle} />
    );
    const toggleButton = await findByTestId("switchButton");
    fireEvent.click(toggleButton);
    expect(onToggle).toBeCalled();
  });
});
