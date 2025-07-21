import { TabGroup, Tab } from '@/components/filter/Category.style';

const categoryOptions = [
  { key: 'MANY_WISH', label: '받고 싶어한' },
  { key: 'MANY_RECEIVE', label: '많이 선물한' },
  { key: 'MANY_WISH_RECEIVE', label: '위시로 받은' },
];

interface CategoryProps {
  selectedCategory: string;
  onChange: (value: string) => void;
}

const Category = ({ selectedCategory, onChange }: CategoryProps) => {
  return (
    <TabGroup>
      {categoryOptions.map(({ key, label }) => (
        <Tab key={key} active={selectedCategory === key} onClick={() => onChange(key)}>
          {label}
        </Tab>
      ))}
    </TabGroup>
  );
};

export default Category;
