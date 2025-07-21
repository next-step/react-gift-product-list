import styled from '@emotion/styled'
import { colors } from '@/theme/color'
import { typography } from '@/theme/typography'
import { spacing } from '@/theme/spacing'
import { YellowButton, ErrorMessage as CommonError } from '@/components/common'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing6};
  padding: ${spacing.spacing6} 0;
  color: ${colors.text.default};
`

export const CardGrid = styled.section`
  display: flex;
  flex-wrap: nowrap;
  gap: ${spacing.spacing2};
  overflow-x: auto;
  padding-bottom: ${spacing.spacing2};
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.border.default};
    border-radius: 3px;
  }
`

export const CardItem = styled.div<{ selected: boolean }>`
  flex: 0 0 auto;
  width: 80px;
  cursor: pointer;
  border: 2px solid
    ${({ selected }) =>
    selected ? colors.brand.kakaoYellow : 'transparent'};
  border-radius: 4px;
  overflow: hidden;
`

export const Thumb = styled.img`
  width: 100%;
  height: auto;
  display: block;
`

export const Preview = styled.section`
  img {
    width: 100%;
    border-radius: 4px;
  }
`

export { CommonError as ErrorMessage }

export const MessageInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${spacing.spacing2};
  border: 1px solid ${colors.border.default};
  border-radius: 4px;
  resize: vertical;
  font-size: ${typography.body1Regular.fontSize};
`

export const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
`

export const Label = styled.label`
  font-size: ${typography.label1Bold.fontSize};
  font-weight: ${typography.label1Bold.fontWeight};
`

export const Input = styled.input`
  padding: ${spacing.spacing2};
  border: 1px solid ${colors.border.default};
  border-radius: 4px;
  font-size: ${typography.body1Regular.fontSize};
`

export const ProductInfo = styled.section`
  display: flex;
  gap: ${spacing.spacing4};
  align-items: center;
`

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing1};
`

export const ProductName = styled.p`
  font-size: ${typography.subtitle2Bold.fontSize};
  font-weight: ${typography.subtitle2Bold.fontWeight};
  line-height: ${typography.subtitle2Bold.lineHeight};
`

export const Brand = styled.p`
  color: ${colors.text.sub};
  font-size: ${typography.label2Regular.fontSize};
  line-height: ${typography.label2Regular.lineHeight};
`

export const Price = styled.p`
  font-size: ${typography.body1Bold.fontSize};
  font-weight: ${typography.body1Bold.fontWeight};
`

export const RecipientHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const EmptyRecipients = styled.div`
  text-align: center;
  padding: ${spacing.spacing3} 0;
`

export const Divider = styled.div`
  height: 1px;
  background: ${colors.border.default};
`

export const RecipientTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
`

export const RecipientTableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  ${typography.label1Regular};
`

export const RecipientRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  ${typography.body2Regular};
`

export const OrderButton = styled(YellowButton)`
  padding: ${spacing.spacing3};
  font-size: ${typography.subtitle1Bold.fontSize};
  font-weight: ${typography.subtitle1Bold.fontWeight};
`