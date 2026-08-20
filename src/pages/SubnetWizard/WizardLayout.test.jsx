import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";
import WizardLayout from "./WizardLayout";

jest.mock("./WizardNavbar", () => () => <div>Wizard Navbar</div>);
jest.mock("./WizardSidebar", () => () => <div>Wizard Sidebar</div>);
jest.mock("./WizardFooter", () => (props) => (
  <button type="button" onClick={props.onNext}>
    Next
  </button>
));

const ValidationProbe = () => {
  const { setStepValidator } = useOutletContext();

  React.useEffect(() => {
    if (setStepValidator) {
      setStepValidator(async () => {
        throw new Error("Step validation failed");
      });
    }

    return () => {
      if (setStepValidator) {
        setStepValidator(null);
      }
    };
  }, [setStepValidator]);

  return <div>Chain ID step</div>;
};

test("does not advance from step 2 when validation fails", async () => {
  render(
    <MemoryRouter initialEntries={["/chain-id"]}>
      <Routes>
        <Route path="/" element={<WizardLayout />}>
          <Route path="chain-id" element={<ValidationProbe />} />
          <Route
            path="bootstrap-validators"
            element={<div>Bootstrap Validators</div>}
          />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  fireEvent.click(screen.getByRole("button", { name: /next/i }));

  expect(screen.getByText(/chain id step/i)).toBeInTheDocument();
  expect(screen.queryByText(/bootstrap validators/i)).not.toBeInTheDocument();
});
