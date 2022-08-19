import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

/**
 * A Spinner
 * 
 * @returns 
 */
const Spinner = () => {
  return (
    <StyledTreeNode data-testid={'spinner'}>
      <FontAwesomeIcon icon={faSpinner} size="1x" className="spinner" />
    </StyledTreeNode>
  );
};

const StyledTreeNode = styled.div`
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

export default Spinner;
