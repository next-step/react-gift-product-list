import React from 'react';
import { useParams } from 'react-router-dom';
import { ThemeHero } from '@/pages/Home/components/SelectThemeSection/ThemeHero';
import { ProductList } from '@/pages/Home/components/SelectThemeSection/ProductList';

export default function ThemeProductsPage() {
  const { themeId } = useParams<{ themeId: string }>();
  const id = Number(themeId);

  return (
    <main>
      <ThemeHero themeId={id} />
      <ProductList themeId={id} />
    </main>
  );
}