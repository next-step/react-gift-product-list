import styled from '@emotion/styled';
import type { MessageCard } from './MessageCardSelector';

interface Props {
    card: MessageCard;
    message: string;
    onChange: (value: string) => void;
}

const SelectedCardPreview = ({ card, message, onChange }: Props) => {
    return (
        <>
            <ImageWrapper>
                <img src={card.imageUrl} alt="미리보기" />
            </ImageWrapper>
            <Textarea
                placeholder="카드에 들어갈 메시지를 입력하세요"
                value={message}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    );
};

export default SelectedCardPreview;

const ImageWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  font-size: 14px;
  border-radius: 8px;
  resize: none;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.kakaoYellow};
  }
`;