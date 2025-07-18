import type { FilterId, GenerationId } from '@/data/categoryDatas';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearchParamState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeGenerationButton, setActiveGenerationButton] = useState<GenerationId>('ALL');
  const [activeFilterButton, setActiveFilterButton] = useState<FilterId>('MANY_WISH');

  useEffect(() => {
    const generation = searchParams.get('targetType') ?? 'ALL';
    const filter = searchParams.get('rankType') ?? 'MANY_WISH';

    setActiveGenerationButton(generation as GenerationId);
    setActiveFilterButton(filter as FilterId);
  }, [searchParams]);

  const handleGenerationGroupClick = (id: GenerationId) => {
    setActiveGenerationButton(id);
    searchParams.set('targetType', id);
    setSearchParams(searchParams, { replace: true });
  };

  const handleFilterGroupClick = (id: FilterId) => {
    setActiveFilterButton(id);
    searchParams.set('rankType', id);
    setSearchParams(searchParams, { replace: true });
  };

  return {
    handleGenerationGroupClick,
    handleFilterGroupClick,
    activeGenerationButton,
    activeFilterButton,
  };
};

export default useSearchParamState;
