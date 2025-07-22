import { ThemeCard } from '@/components/GiftThema/Thema/ThemeItem.styles.ts';

interface Props {
  image: string;
  name: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ThemeItem({ image, name, onClick }: Props) {
  return (
    <ThemeCard onClick={onClick}>
      <img src={image} alt={name} />
      <p>{name}</p>
    </ThemeCard>
  );
}
