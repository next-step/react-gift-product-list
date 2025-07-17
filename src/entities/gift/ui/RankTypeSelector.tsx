import { rankType, type RankTypeQuery } from "@/entities/gift/constants/rankType";

import { useQueryParamState } from "@/shared/hooks/useQueryParamState";

import * as Styles from "./RankTypeSelector.styled";

export const RankTypeSelector = () => {
    const [selectedRankType, setSelectedRankType] = useQueryParamState<RankTypeQuery>(
        "rankType",
        "MANY_WISH",
    );

    return (
        <Styles.SelectorContainer>
            {rankType.map((rank) => {
                return (
                    <RankTypeSelectorItem
                        key={rank.query}
                        rank={rank}
                        isActive={selectedRankType === rank.query}
                        onSelect={setSelectedRankType}
                    />
                );
            })}
        </Styles.SelectorContainer>
    );
};

export interface RankTypeSelectorItemProps {
    rank: (typeof rankType)[number];
    isActive: boolean;
    onSelect: (query: RankTypeQuery) => void;
}

export const RankTypeSelectorItem = ({
    rank: { query, label },
    isActive = false,
    onSelect,
}: RankTypeSelectorItemProps) => {
    return (
        <Styles.ItemLabel isActive={isActive} onClick={() => onSelect(query)}>
            {label}
        </Styles.ItemLabel>
    );
};
