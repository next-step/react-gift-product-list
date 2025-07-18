import { targetGroup, type TargetGroupQuery } from "@/entities/gift/constants/targetType";

import { useQueryParamState } from "@/shared/hooks/useQueryParamState";

import * as Styles from "./TargetGroupSelector.styled";

export const TargetGroupSelector = () => {
    const [selectedGroup, setSelectedGroup] = useQueryParamState<TargetGroupQuery>(
        "targetType",
        "ALL",
    );

    return (
        <Styles.SelectorContainer>
            {targetGroup.map((group) => {
                return (
                    <TargetGroupSelectorItem
                        key={group.query}
                        group={group}
                        isActive={selectedGroup === group.query}
                        onSelect={setSelectedGroup}
                    />
                );
            })}
        </Styles.SelectorContainer>
    );
};

export interface TargetGroupSelectorItemProps {
    group: (typeof targetGroup)[number];
    isActive: boolean;
    onSelect: (query: TargetGroupQuery) => void;
}

export const TargetGroupSelectorItem = ({
    group: { query, iconText, label },
    isActive,
    onSelect,
}: TargetGroupSelectorItemProps) => {
    return (
        <Styles.ItemContainer onClick={() => onSelect(query)}>
            <Styles.ItemIconText isActive={isActive}>{iconText}</Styles.ItemIconText>
            <Styles.ItemLabel isActive={isActive}>{label}</Styles.ItemLabel>
        </Styles.ItemContainer>
    );
};
