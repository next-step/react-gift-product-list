import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const GiftThemeSection = styled.section`
  padding: 8px;
`;


export const ThemeGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 4px;
`;

export const ThemeItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  cursor: pointer;
`;

export const ThemeImage = styled.img`
  max-width: 3.125rem;
  max-height: 3.125rem;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  overflow: hidden;
`;

export const ThemeLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

export const Spinner = styled.div`
  border: 3px solid #ffffffff;
  border-top: 3px solid #555;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
`;