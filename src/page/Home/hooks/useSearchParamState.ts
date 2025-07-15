import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearchParamState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeGenerationButton, setActiveGenerationButton] = useState<string>('ALL');
  const [activeFilterButton, setActiveFilterButton] = useState<string>('MANY_WISH');

  useEffect(() => {
    const generation = searchParams.get('targetType') ?? 'ALL';
    const filter = searchParams.get('rankType') ?? 'MANY_WISH';

    setActiveGenerationButton(generation);
    setActiveFilterButton(filter);
  }, [searchParams]);

  const handleGenerationGroupClick = (id: string) => {
    setActiveGenerationButton(id);
    searchParams.set('targetType', id);
    setSearchParams(searchParams, { replace: true });
  };

  const handleFilterGroupClick = (id: string) => {
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
