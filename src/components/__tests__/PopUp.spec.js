import { render, screen, fireEvent } from "@testing-library/react";
import PopUp from "../PopUp";

describe("PopUp testing", () => {
  let mockedCloseHandler = jest.fn();
  let mockedProps = {}

  beforeEach(() => {
    mockedProps = {
      content: "File content here",
      closeHandler: mockedCloseHandler,
    };
  });

  it('should render the popup correctly', () => {
    render(<PopUp {...mockedProps} />);
    const popupComp = screen.getByTestId('popup');
    
    expect(popupComp.querySelector('div.popup-file-content').textContent).toBe('File content here')
  })

  it('should close popup if click on X', () => {
    render(<PopUp {...mockedProps} />);
    const popupComp = screen.getByTestId('xbutton');
    fireEvent.click(popupComp);

    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  })
});
