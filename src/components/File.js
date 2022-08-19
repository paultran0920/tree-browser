import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import PopUp from './PopUp';
import Spinner from './Spinner';

/**
 * Display the file and handler click
 * 
 * @param {*} props 
 * @returns 
 */
const File = (props) => {

  const {
    id: fileId,
    fileName,
    loadFileContent
  } = props

  const [ isPopupOpen, setIsPopopOpen ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ fileContent, setFileContent ] = useState('');

  const fileClickHandler = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    setIsLoading(true);
    setFileContent(await loadFileContent(fileId));
    setIsLoading(false);
    setIsPopopOpen(true)
  }

  const closePopupHandler = () => {
    setIsPopopOpen(false)
  }

  return (
    <StyledFileComponent>
      <div className='file' onClick={fileClickHandler} data-testid={`file-${fileId}`}>
        <FontAwesomeIcon
          icon={'fa-file-code'}
          size='1x'
        />
        {isLoading ? <Spinner /> : <p>{fileName}</p>}
      </div>
      {isPopupOpen && <PopUp content={fileContent.contents || 'File Empty!'} closeHandler={closePopupHandler} />}
    </StyledFileComponent>
  );
};

const StyledFileComponent = styled.div`
  .file {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .file p {
    margin-left: 5px;
  }
  .file .spinner {
    margin-left: 5px;
  }
`;

export default File
