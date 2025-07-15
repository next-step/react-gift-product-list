import { SexContainerWrapperItem } from '@/styles/Sex/SexItemStyle.styles';

type SexProps = {
  sex: string;
  sexName: string;
  selectSex: string;
  onClick: () => void;
};

function SexItem({ sex, sexName, selectSex, onClick }: SexProps) {
  const selected = sex === selectSex;
  return (
    <SexContainerWrapperItem selected={selected} onClick={onClick}>
      {sexName}
    </SexContainerWrapperItem>
  );
}

export default SexItem;
