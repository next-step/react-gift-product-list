import styled from '@emotion/styled';
import { TargetS, type FilterProps } from './RankingTypes';

const TargetTab = ({ selected: selectedTarget, onSelect }: FilterProps) => {
  return (
    <TargetRow>
      {TargetS.map((label) => (
        <TargetButton
          key={label}
          active={selectedTarget === label}
          onClick={() => onSelect(label)}
        >
          {label}
        </TargetButton>
      ))}
    </TargetRow>
  );
};

export default TargetTab;

const TargetRow = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing.spacing2,
  marginBottom: theme.spacing.spacing3,
  padding: theme.spacing.spacing2,
}));

const TargetButton = styled.button<{ active: boolean }>(
  ({ theme, active }) => ({
    padding: `${theme.spacing.spacing2} ${theme.spacing.spacing3}`,
    borderRadius: '20px',
    backgroundColor: active
      ? theme.colors.blue.blue600
      : theme.colors.gray.gray100,
    color: active ? '#fff' : theme.colors.gray.gray700,
    border: 'none',
    fontSize: theme.typography.label2Regular.fontSize,
    cursor: 'pointer',
    fontWeight: 600,
  })
);
