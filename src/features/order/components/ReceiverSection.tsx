import styled from '@emotion/styled'
import { ReceiverAddModal } from './Receiver/ReceiverAddModal'
import { ReceiverTable } from './Receiver/ReceiverTable'
import { useOrderForm } from '@/contexts/order'
import { Button, Typography } from '@/components/ui'

export const ReceiverSection = () => {
  const { openModal, form } = useOrderForm()
  const receivers = form.watch('receivers')

  const handleAddReceiver = () => {
    openModal()
  }

  return (
    <SectionContainer>
      {/* 섹션 헤더 */}
      <SectionHeader>
        {/* 섹션 제목 */}
        <SectionTitle variant="title2Bold">받는 사람</SectionTitle>
        {/* 추가 버튼 */}
        <AddButton variant="default" size="small" onClick={handleAddReceiver}>
          {receivers.length > 0 ? '수정' : '추가'}
        </AddButton>
      </SectionHeader>
      {/* 받는 사람 추가된 목록 */}
      <ReceiverTable />
      {/* 받는 사람 추가 모달 (평소에 안보임) */}
      <ReceiverAddModal />
    </SectionContainer>
  )
}

// * 섹션 컨테이너
const SectionContainer = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing4} ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.semanticColors.background.default};
  border-bottom: 1px solid ${({ theme }) => theme.semanticColors.border.default};

  display: flex;
  flex-direction: column;
`

// * 섹션 제목
const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

// * 섹션 제목
const SectionTitle = styled(Typography)`
  color: ${({ theme }) => theme.semanticColors.text.default};
`

// * 추가 버튼
const AddButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.spacing2} ${({ theme }) => theme.spacing.spacing4};
`
