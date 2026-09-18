import styled from "styled-components";

const Button = styled.button`
  background: #55c57a;
  padding: 5px 8px;
  border-radius: 6px;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: #eee;
  /* border: 1px solid gray; */
  border-radius: 10px;

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;
  /* max-width: 90%; */
  margin: auto;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: gray;
    font-size: 14px;
  }
`;
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <StyledErrorFallback>
      <Box>
        <h1>Oops! Something Went Wrong</h1>
        <p>
          {/* {error.message} */}
          Something unexpected happened on our side. It’s not your fault. Please
          try again in a moment.
        </p>
        <Button size="large" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Box>
    </StyledErrorFallback>
  );
}

export default ErrorFallback;
