import { CategoryTab, TabCircle, TabRow, SortRow, SortTab } from '@/components/GiftRanking/GiftRanking.styles';

const categoryTabs = ['전체', '여성', '남성', '10대'] as const;
const sortTabs = ['많이 찜한', '많이 받은', '많이 찜하고 받은'] as const;

type Category = typeof categoryTabs[number];
type Sort = typeof sortTabs[number];

const categoryEmojis: Record<Category, string> = {
    전체: 'ALL',
    여성: '👩',
    남성: '👨',
    '10대': '👦',
};

type Props = {
    selectedCategory: Category;
    selectedSort: Sort;
    onChangeCategory: (tab: Category) => void;
    onChangeSort: (tab: Sort) => void;
};

const GiftRankingFilter = ({
    selectedCategory,
    selectedSort,
    onChangeCategory,
    onChangeSort,
}: Props) => (
    <>
        <TabRow>
            {categoryTabs.map((tab) => (
                <CategoryTab
                    key={tab}
                    isSelected={selectedCategory === tab}
                    onClick={() => onChangeCategory(tab)}
                >
                    <TabCircle isSelected={selectedCategory === tab}>
                        {categoryEmojis[tab]}
                    </TabCircle>
                    {tab}
                </CategoryTab>
            ))}
        </TabRow>

        <SortRow>
            {sortTabs.map((tab) => (
                <SortTab
                    key={tab}
                    isSelected={selectedSort === tab}
                    onClick={() => onChangeSort(tab)}
                >
                    {tab}
                </SortTab>
            ))}
        </SortRow>
    </>
);

export default GiftRankingFilter;
