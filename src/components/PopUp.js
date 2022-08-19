import React, { useState } from 'react';
import styled from 'styled-components';

const PopUp = (props) => {

  const {
    content,
    closeHandler,
    className
  } = props

  const [isClosed, setIsClosed] = useState(false)

  const handleClose = () => {
    setIsClosed(true)
    closeHandler()
  }
  
  return (
    !isClosed ?
      (<StyledPopUp className={className}>
        <div className='popup-background' data-testid={'popup'}>
          <div className='popup'>
            {/* x close button */}
            <button className='popup-close' onClick={handleClose} data-testid={'xbutton'}>X</button>
            {/* File content */}
            <div className='popup-file-content'>{content}</div>
          </div>
        </div>
      </StyledPopUp>
    ):null
  )
};

const StyledPopUp = styled.div`
  .popup-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  }

  .popup {
    position: fixed;

    left: 25%;
    top: 30%;

    width: 50%;

    border: 1px solid #011627;
    border-radius: 1em;

    background-color: #fdfffc;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    color: #011627;
  }

  .popup-close {
    width: 3em;
    height: 2em;

    border: none;
    border-top-right-radius: 1em;
    border-bottom-left-radius: 1em;
    border-bottom: 1px solid black;
    border-left: 1px solid black;

    align-self: flex-end;
    justify-self: flex-start;
  }

  .popup-file-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
  }
`;

export default PopUp;
