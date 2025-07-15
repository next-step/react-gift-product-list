import Item from '@/components/Item';
import ItemBtn from '@/components/ItemBtn';
import { useState } from 'react';
import { ItemContainerStyle, ItemlistContainer } from '@/styles/Item/ItemlistContainer.styles';
import type { RankItemType } from '@/types/DTO/productDTO';

type ItemContainerProps = {
  itemList: RankItemType[];
};
function ItemContainer({ itemList }: ItemContainerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleItems = isExpanded ? itemList : itemList.slice(0, 6);
  function handleToggle() {
    setIsExpanded((prev) => !prev);
  }
  function renderItem() {
    return itemList.length === 0 ? (
      <>상품이 없습니다.</>
    ) : (
      <>
        <ItemContainerStyle>
          {visibleItems.map((itemData, index) => (
            <Item key={itemData.id} index={index} itemData={itemData} />
          ))}
        </ItemContainerStyle>
        <ItemBtn isExpanded={isExpanded} onClick={handleToggle} />
      </>
    );
  }
  return <ItemlistContainer>{renderItem()}</ItemlistContainer>;
}

export default ItemContainer;
