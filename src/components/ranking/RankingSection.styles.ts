/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { ThemeType } from "@/styles/theme/theme";

export const section = (theme: ThemeType) => css`
  padding: ${theme.spacing.spacing4};
  background-color: white;
`;

export const title = (theme: ThemeType) => css`
  ${theme.typography.title1Bold};
  color: ${theme.colors.textDefault};
  margin-bottom: ${theme.spacing.spacing4};
`;

export const filterContainer = (theme: ThemeType) => css`
  margin-bottom: ${theme.spacing.spacing4};
`;

export const groupFilterContainer = (theme: ThemeType) => css`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.spacing3};
`;

export const groupButton = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
`;

export const groupIcon = (theme: ThemeType, isSelected: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-bottom: ${theme.spacing.spacing1};
  border-radius: 17px;
  ${theme.typography.label1Bold};
  background-color: ${isSelected ? theme.colors.blue700 : theme.colors.blue100};
  color: ${isSelected ? theme.colors.blue200 : theme.colors.blue400};
`;

export const groupText = (theme: ThemeType, isSelected: boolean) => css`
  ${isSelected ? theme.typography.label1Bold : theme.typography.label1Regular};
  color: ${isSelected ? theme.colors.blue700 : theme.colors.gray700};
`;

export const actionFilter = (theme: ThemeType) => css`
  display: flex;
  justify-content: space-around;
  padding: ${theme.spacing.spacing4};
  background-color: ${theme.colors.blue100};
  border-radius: 10px;
`;

export const actionButton = (theme: ThemeType, isSelected: boolean) => css`
  cursor: pointer;
  color: ${isSelected ? theme.colors.blue700 : theme.colors.gray700};
  ${isSelected ? theme.typography.label1Bold : theme.typography.label1Regular};
`;

export const grid = (theme: ThemeType) => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.spacing2};
  margin-bottom: ${theme.spacing.spacing4};
`;

export const moreButton = (theme: ThemeType) => css`
  width: 100%;
  padding: ${theme.spacing.spacing3};
  border: 1px solid ${theme.colors.gray300};
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  ${theme.typography.body1Regular};
  color: ${theme.colors.textDefault};
`;

export const emptyState = (theme: ThemeType) => css`
  text-align: center;
  color: ${theme.colors.gray700};
  ${theme.typography.body1Regular};
  margin-top: 20px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
`;
export const EmptyStateWrapper = (theme: ThemeType) => css`
  text-align: center;
  color: ${theme.colors.gray700};
  ${theme.typography.body1Regular};
  margin-top: 20px;
`;