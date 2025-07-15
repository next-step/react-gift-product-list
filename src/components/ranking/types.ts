//label을 타입으로 먼저 정의
export const PERSON_FILTER_LABELS = ['전체', '남자가', '여자가', '청소년이'] as const;
export type PersonFilterLabels = (typeof PERSON_FILTER_LABELS)[number];
export const BEHAVIOR_FILTER_LABELS = ['받고 싶어한', '많이 선물한', '위시로 받은'] as const;
export type BehaviorFilterLabels = (typeof BEHAVIOR_FILTER_LABELS)[number];

//param 도 타입으로 설정
export type PersonParam = 'ALL' | 'MALE' | 'FEMALE' | 'TEEN';
export type BehaviorParam = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';


//옵션 객체 타입
export type personFilterType = {
  label: PersonFilterLabels;
  emoji: string;
  param: PersonParam;
};

export type behaviorFilterType = { label: BehaviorFilterLabels; param: BehaviorParam };


// props에서도 타입을 이용
export type personProps = {
  options: readonly personFilterType[];
  selected: PersonParam| null;
  onSelect: (option: PersonParam) => void;

};

export type behaviorProps = {
  options: readonly behaviorFilterType[];
  selected: BehaviorParam | null;
  onSelect: (option: BehaviorParam) => void;

