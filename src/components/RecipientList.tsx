import {
  EmptyRecipients,
  Divider,
  RecipientTable,
  RecipientTableHeader,
  RecipientRow,
} from '@/styles/OrderPage.styles'

interface Recipient {
  name: string
  phone: string
  qty: number
}

interface RecipientListProps {
  recipients: Recipient[]
  fields: { id: string }[]
}

export default function RecipientList({
  recipients,
  fields,
}: RecipientListProps) {
  if (recipients.length === 0) {
    return (
      <EmptyRecipients>
        <p>
          받는 사람이 없습니다.
          <br />
          받는 사람을 추가해주세요.
        </p>
      </EmptyRecipients>
    )
  }

  return (
    <>
      <Divider />
      <RecipientTable>
        <RecipientTableHeader>
          <p>이름</p>
          <p>전화번호</p>
          <p>수량</p>
        </RecipientTableHeader>
        {recipients.map((r, index) => (
          <RecipientRow key={fields[index].id}>
            <p>{r.name}</p>
            <p>{r.phone}</p>
            <p>{r.qty}</p>
          </RecipientRow>
        ))}
      </RecipientTable>
      <Divider />
    </>
  )
}