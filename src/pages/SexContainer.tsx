import SexItem from '@/components/SexItem';
import { SexContainerWrapper } from '@/styles/Sex/SexContainer.styles';
import type { SexType } from '@/types/sex';
import { SEX_TYPE } from '@/types/sex';

type SexContainerProps = {
  selectedSex: SexType;
  handleSelect: (sex: SexType) => void;
};
function SexContainer({ selectedSex, handleSelect }: SexContainerProps) {
  return (
    <SexContainerWrapper>
      <SexItem
        sex={SEX_TYPE.ALL}
        sexName={'전체'}
        selectSex={selectedSex}
        onClick={() => handleSelect(SEX_TYPE.ALL)}
      />
      <SexItem
        sex={SEX_TYPE.MALE}
        sexName={'남성'}
        selectSex={selectedSex}
        onClick={() => handleSelect(SEX_TYPE.MALE)}
      />
      <SexItem
        sex={SEX_TYPE.FEMALE}
        sexName={'여성'}
        selectSex={selectedSex}
        onClick={() => handleSelect(SEX_TYPE.FEMALE)}
      />
      <SexItem
        sex={SEX_TYPE.TEEN}
        sexName={'청소년'}
        selectSex={selectedSex}
        onClick={() => handleSelect(SEX_TYPE.TEEN)}
      />
    </SexContainerWrapper>
  );
}

export default SexContainer;
