import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import File from './File';
import Spinner from './Spinner';

/**
 * Recursive folder
 * 
 * @param {*} props 
 * @returns 
 */
const Folder = (props) => {
  const {
    id: folderId,
    name: itemName,
    type: itemType,
    // children from props is only available at root level
    // in the sub folder, it will be loaded late
    children: subItems,
    loadFileContent,
    loadFolder
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [childVisible, setChildVisible] = useState(false);
  const [children, setChildren] = useState(subItems);

  useEffect(() => {
    if (folderId.toLowerCase() === 'root') {
      handleFolderClick();
    }
  }, []);

  const handleFolderClick = async (event) => {
    event && event.stopPropagation();
    event && event.preventDefault();
    setChildVisible((childVisible) => !childVisible);
    if (!children) {
      setIsLoading(true);
      // Children is the 'entries' array from json result
      setChildren((await loadFolder(folderId)).entries);
      setIsLoading(false);
    }
  };

  const buildKey = (curId, newId) => {
    if (curId.toLowerCase().startsWith('root')) {
      return newId;
    } else {
      return `${curId}%2F${newId}`;
    }
  }

  return (
    <StyledTreeNode>
      {itemType === 'directory' ? (
        <>
          <div className='folderContainer' onClick={handleFolderClick} data-testid={folderId}>
            <div className={childVisible ? 'active' : ''}>
              <FontAwesomeIcon icon={faCaretRight} size='2x' />
            </div>
            <div className='folder'>
              <p>{itemName}</p>
            </div>
          </div>

          {isLoading && <Spinner />}

          {children && childVisible && (
            <div className='child-tree-node'>
              {children.map((item) => {
                return item.type === 'directory' ? 
                  (<Folder
                    key={buildKey(folderId, item.name)}
                    id={buildKey(folderId, item.name)}
                    name={item.name}
                    type={item.type}
                    loadFileContent={loadFileContent}
                    loadFolder={loadFolder}
                  />
                ) : (
                  <File
                    key={buildKey(folderId, item.name)}
                    id={buildKey(folderId, item.name)}
                    fileName={item.name}
                    loadFileContent={loadFileContent}
                  />
                );
              })}
            </div>
          )}
        </>
      ) : (
        <File
          key={buildKey(folderId, itemName)}
          id={buildKey(folderId, itemName)}
          fileName={itemName}
          loadFileContent={loadFileContent}
        />
      )}
    </StyledTreeNode>
  );
};

const StyledTreeNode = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  margin: 1rem auto;

  .folderContainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .active {
    transform: rotate(45deg);
  }

  .folder {
    display: flex;
    margin-left: 1rem;
    align-items: center;
  }

  .folder p {
    margin-left: 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  .child-tree-node {
    padding: 0 2rem;
  }

  .spinner {
    animation: spin infinite 5s linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Folder;
