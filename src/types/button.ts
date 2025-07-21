import type { ButtonHTMLAttributes } from 'react';

export interface TargetButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  targetType: string;
  isClicked: boolean;
  setTargetType: React.Dispatch<React.SetStateAction<string>>;
}

export interface TopicButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  topicType: string;
  isClicked: boolean;
  setRankType: React.Dispatch<React.SetStateAction<string>>;
}

export interface MoreButtonType {
  isViewMore: boolean;
  setIsViewMore: React.Dispatch<React.SetStateAction<boolean>>;
}
