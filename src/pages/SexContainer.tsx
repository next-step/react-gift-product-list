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
      {SEX_TYPE.map((sexType) => (
        <SexItem
          key={sexType.value}
          sex={sexType.value}
          sexName={sexType.label}
          selectSex={selectedSex}
          onClick={() => handleSelect(sexType.value)}
        />
      ))}
    </SexContainerWrapper>
  );
}

export default SexContainer;
