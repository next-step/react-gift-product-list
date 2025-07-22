import styled from '@emotion/styled';
import { RankS, type FilterProps } from './RankingTypes';

const RankTab = ({ selected: selectedRank, onSelect }: FilterProps) => {
  return (
    <RankRow>
      {RankS.map((label) => (
        <RankButton
          key={label}
          active={selectedRank === label}
          onClick={() => onSelect(label)}
        >
          {label}
        </RankButton>
      ))}
    </RankRow>
  );
};

export default RankTab;

const RankRow = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.colors.gray.gray100,
  padding: theme.spacing.spacing1,
  borderRadius: '8px',
  marginBottom: theme.spacing.spacing4,
}));

const RankButton = styled.button<{ active?: boolean }>(({ theme, active }) => ({
  flex: 1,
  padding: theme.spacing.spacing2,
  fontSize: theme.typography.body2Bold.fontSize,
  fontWeight: theme.typography.body2Bold.fontWeight,
  border: 'none',
  borderRadius: '6px',
  backgroundColor: active ? theme.colors.blue.blue600 : 'transparent',
  color: active ? '#fff' : theme.colors.gray.gray600,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
}));
