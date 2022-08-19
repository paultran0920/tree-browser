import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faFolder,
  faFolderOpen,
  faFile,
  faFileCode,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";
import FolderTree from "./containers/FolderTree";

library.add(fab, faFolder, faFolderOpen, faFile, faFileCode, faFileImage);

const App = () => {
  return (
    <FolderTree />
  );
}

export default App;
