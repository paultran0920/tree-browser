import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Folder from "../Folder";

describe("Folder testing", () => {
  let mockedLoadFileContent = async (fileId) => {
    return {
      id: fileId,
      contents: 'File content xxx'
    }
  }
  let mockedLoadFolder = async (folderId) => {
    return {
      "id": `${folderId}/sub-folder`,
      "entries": [
        {
          "name": `${folderId}-sud-dir`,
          "type": "directory"
        },
        {
          "name": "index.js",
          "type": "file"
        }
      ]
    }
  }
  let mockedProps = {};

  beforeEach(() => {
    mockedProps = {
      id: 'root',
      name: 'root',
      type: 'directory',
      children: [
        {
          "name": "root-sub-dir",
          "type": "directory"
        },
        {
          "name": "index.js",
          "type": "file"
        }
      ],
      loadFileContent: mockedLoadFileContent,
      loadFolder: mockedLoadFolder
    };
  });

  it("should render the folder correctly", () => {
    act(() => {
      render(<Folder {...mockedProps} />);
    });

    const fileComp = screen.getByTestId("root");

    expect(fileComp).toBeInTheDocument();
  });

  it("should render the sub folders and files", async () => {
    act(() => {
      render(<Folder {...mockedProps} />);
    });

    await waitFor(() => expect(screen.getByTestId("root-sub-dir")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId("file-index.js")).toBeInTheDocument());
  });

  it("should render the sub folder content if clicking on it", async () => {
    act(() => {
      render(<Folder {...mockedProps} />);
    });

    await waitFor(() => expect(screen.getByTestId("root-sub-dir")).toBeInTheDocument());

    act(() => {
      fireEvent.click(screen.getByTestId("root-sub-dir"));
    });

    await waitFor(() => expect(screen.getByTestId("root-sub-dir-sud-dir")).toBeInTheDocument());
  });
});
