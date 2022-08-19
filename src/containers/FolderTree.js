import TreeNode from "../components/Folder";
import { loadFileContent, loadDirectory } from '../transport/FileServerHelper'

const FolderTree = () => {
  return (
    <TreeNode
      key={`root`}
      id={`root`}
      name={`Root`}
      type={'directory'}
      loadFileContent={loadFileContent}
      loadFolder={loadDirectory}
    />
  )
};

export default FolderTree;
