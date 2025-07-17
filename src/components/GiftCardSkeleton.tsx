import { css, keyframes } from '@emotion/react';
import { palette } from '@/styles/theme';

const card = css`
  border: 1px solid ${palette.gray200};
  border-radius: 8px;
  overflow: hidden;
  background: ${palette.white};
`;

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

const imgBox = css`
  width: 100%;
  aspect-ratio: 1/1;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s linear infinite;
`;

const info = css`
  padding: 8px;
  .name { width: 80%; height: 14px; background: ${palette.gray200}; margin-bottom: 4px; border-radius: 4px; }
  .price { width: 50%; height: 14px; background: ${palette.gray200}; border-radius: 4px; }
`;

export const GiftCardSkeleton = () => (
  <div css={card}>
    <div css={imgBox} />
    <div css={info}>
      <div className="name" />
      <div className="price" />
    </div>
  </div>
);
