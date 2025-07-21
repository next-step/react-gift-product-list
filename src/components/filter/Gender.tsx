import { ButtonGroup, FilterItem, Label } from '@/components/filter/Gender.style';

const genderOptions = [
  { key: 'all', label: '전체', icon: 'ALL' },
  { key: 'female', label: '여성이', icon: '👩🏻' },
  { key: 'male', label: '남성이', icon: '👨🏻' },
  { key: 'teen', label: '청소년이', icon: '👦🏻' },
];

interface GenderProps {
  selectedGender: string; 
  onChange: (value: string) => void;
}

const Gender = ({ selectedGender, onChange }: GenderProps) => {
  return (
    <ButtonGroup>
      {genderOptions.map(({ key, icon, label }) => {
        const isActive = selectedGender === key;

        return (
          <div key={key} style={{ textAlign: 'center' }}>
            <FilterItem active={isActive} onClick={() => onChange(key)}>
              {icon === 'ALL' ? (
                <span style={{ fontSize: '14px', fontWeight: 700 }}>ALL</span>
              ) : (
                <span>{icon}</span>
              )}
            </FilterItem>
            <Label active={isActive}>{label}</Label>
          </div>
        );
      })}
    </ButtonGroup>
  );
};

export default Gender;
