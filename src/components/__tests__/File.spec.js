import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import File from "../File";

describe("File testing", () => {
  let mockedLoadFileContent = async (fileId) => {
    return {
      id: fileId,
      contents: 'File content xxx'
    }
  }
  let mockedProps = {};

  beforeEach(() => {
    mockedProps = {
      id: 'fileId',
      fileName: 'fileName',
      loadFileContent: mockedLoadFileContent
    };
  });

  it("should render the file correctly", () => {
    act(() => {
      render(<File {...mockedProps} />);
    });

    const fileComp = screen.getByTestId("file-fileId");

    expect(fileComp.textContent).toBe('fileName');
  });

  it("should display the popup if clicking on file", async () => {
    act(() => {
      render(<File {...mockedProps} />);
    });

    const fileComp = screen.getByTestId("file-fileId");
    act(() => {
      fireEvent.click(fileComp);
    });
    
    await waitFor(() => expect(screen.getByTestId("popup")).toBeInTheDocument());
  });
});
