import styled from "styled-components";

const StyledContainer = styled.main`
  background: linear-gradient(to bottom, white, black);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center; 
  align-items: center;     
`;

const StyledContent = styled.div`
  background-color: #555e58;
  width: 100%;
  max-width: 400px; 
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin-top: -150px;
  box-sizing: border-box;
`;

function PaginaBaseFormulario({ children }: { children: React.ReactNode }) {
  return (
    <StyledContainer>
      <StyledContent>{children}</StyledContent>
    </StyledContainer>
  );
}

export default PaginaBaseFormulario;
