import { css } from '@emotion/react';
import { palette, spacing, typography } from '@/styles/theme';

export type GenderFilter = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
export type SortFilter = 'WANT' | 'RECEIVE' | 'WISH_RECEIVE';

interface Props {
  gender: GenderFilter;
  sort: SortFilter;
  onChange: (gender: GenderFilter, sort: SortFilter) => void;
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing4};
  margin: ${spacing.spacing6} 0;
`;

const titleStyle = css`
  font-weight: 700;
  font-size: 20px;
`;

const genderRow = css`
  display: flex;
  gap: 10px;
`;

const sortRow = css`
  display: flex;
  background: ${palette.blue100};
  padding: 12px;
  border-radius: 12px;
`;

const genderButton = (active: boolean) => css`
  flex: 0.5;
  width: 70px;                     
  padding: 10px 0;               
  border-radius: 50px;     
  font-size: ${typography.body2Bold.fontSize};
  font-weight: ${typography.body2Bold.fontWeight};
  color: ${active ? palette.white : palette.gray800};
  background: ${active ? palette.blue700 : palette.blue00};
  border: none;
  cursor: pointer;
`;

const sortButton = (active: boolean) => css`
  position: relative;
  flex: 1;
  font-weight: 700;
  font-size: 14px;
  color: ${active ? palette.blue700 : palette.gray500};
  padding-bottom: 4px;
  
  cursor: pointer;
`;

const genderIcons: Record<GenderFilter, string> = {
  ALL: 'ALL',
  FEMALE: '👩',
  MALE: '👨',
  TEEN: '🧒',
};

const genderLabels: Record<GenderFilter, string> = {
  ALL: '전체',
  FEMALE: '여성이',
  MALE: '남성이',
  TEEN: '청소년이',
};

const sortLabels: Record<SortFilter, string> = {
  WANT: '받고 싶어한',
  RECEIVE: '위시로 받은',
  WISH_RECEIVE: '찜하고 받은',
};


export const RankingTabs = ({ gender, sort, onChange }: Props) => {
  return (
    <div css={wrapper}>
      <div css={titleStyle}>실시간 급상승 선물 랭킹</div>
      <div css={genderRow}>
        {(Object.keys(genderLabels) as GenderFilter[]).map((key) => (
          <button
            key={key}
            css={genderButton(gender === key)}
            onClick={() => {
              onChange(key, sort);
            }}
          >
            <span style={{ fontSize: 24, lineHeight: 1 }}>{genderIcons[key]}</span>
            <br />
            {genderLabels[key]}
          </button>
        ))}
      </div>
      <div css={sortRow}>
        {(Object.keys(sortLabels) as SortFilter[]).map((key) => (
          <button
            key={key}
            css={sortButton(sort === key)}
            onClick={() => {
              onChange(gender, key);
            }}
          >
            {sortLabels[key]}
          </button>
        ))}
      </div>
    </div>
  );
};
