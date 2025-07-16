/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

type TargetGroupFilter = "ALL" | "FEMALE" | "MALE" | "TEEN";
type PreferenceFilter = "MANY_WISH" | "MANY_RECEIVE" | "MANY_WISH_RECEIVE";

import { useSearchParams } from "react-router-dom";
import SelectableButton from "@/components/common/BaseButton";

const TARGET_GROUP_OPTIONS: {
  icon: string;
  value: TargetGroupFilter;
  label: string;
}[] = [
  { icon: "ALL", value: "ALL", label: "전체" },
  { icon: "💁‍♀️", value: "FEMALE", label: "여성이" },
  { icon: "🙋‍♂️", value: "MALE", label: "남성이" },
  { icon: "🧒", value: "TEEN", label: "청소년이" },
];

const PREFERENCE_OPTIONS: { value: PreferenceFilter; label: string }[] = [
  { value: "MANY_WISH", label: "받고 싶어한" },
  { value: "MANY_RECEIVE", label: "많이 선물한" },
  { value: "MANY_WISH_RECEIVE", label: "위시로 받은" },
];

export default function FilterButtons() {
  const [searchParams, setSearchParams] = useSearchParams();

  const targetGroupSelected =
    (searchParams.get("targetType") as TargetGroupFilter) || "ALL";
  const preferenceSelected =
    (searchParams.get("rankType") as PreferenceFilter) || "MANY_WISH";

  return (
    <>
      <TargetGroupfilterContainer>
        {TARGET_GROUP_OPTIONS.map(({ icon, value, label }) => (
          <SelectableButton
            key={value}
            icon={icon}
            label={label}
            isActive={targetGroupSelected === value}
            onClick={() => {
              searchParams.set("targetType", value);
              setSearchParams(searchParams);
            }}
            color="blue"
            direction="vertical"
          />
        ))}
      </TargetGroupfilterContainer>
      <PreferencefilterContainer>
        {PREFERENCE_OPTIONS.map(({ value, label }) => (
          <SelectableButton
            key={value}
            label={label}
            isActive={preferenceSelected === value}
            onClick={() => {
              searchParams.set("rankType", value);
              setSearchParams(searchParams);
            }}
            color="blue"
          />
        ))}
      </PreferencefilterContainer>
    </>
  );
}

const TargetGroupfilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
`;

const PreferencefilterContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.blue200};
  width: 90%;
  margin-top: 12px;
  gap: 8px;
  border-radius: 25px;
  margin-bottom: 16px;
`;
