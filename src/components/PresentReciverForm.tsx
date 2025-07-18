import React from "react"
import Text from "./Text"
import Layout from "./Layout"
import InputForm from "@/components/InputForm"
import Blank from "./Blank"
import RowForm from "@/components/RowForm"
import { ERROR_MESSAGES } from "@/constants/messages"
/*
이 코드는 여러명의 받는 사람 관련 컴포넌트를 추가한뒤로 더이상 쓰지 않는 코드입니다. 
하지만 혹시나 쓸 데가 있을 까 싶어 남겨놓았고, pnpm build를 했을 때 타입이 깨지는 것을 확인하여서 FormData_v2라는 새로운 타입을 만들어서 간이로 구현해놓았습니다.
*/
export interface FormData_v2 {
  senderName: string
  receiverName: string
  receiverPhone: string
  quantity: number
  message?: string
}
export type FormField_v2 = keyof FormData_v2
export interface PresentReciverFormProps {
  formData_v2: FormData_v2
  handleInputChange: (field: FormField_v2, value: string) => void
  hasError: (field: FormField_v2) => boolean
  phoneErrorMessage?: string
}
const getErrorMessage_v2 = (
  hasError: (field: FormField_v2) => boolean,
  field: FormField_v2
): string | undefined => (hasError(field) ? ERROR_MESSAGES[field] : undefined)

const PresentReciverForm: React.FC<PresentReciverFormProps> = ({
  formData_v2,
  handleInputChange,
  hasError,
  phoneErrorMessage,
}) => {
  return (
    <Layout
      marginTop="spacing2"
      paddingUp="spacing4"
      paddingLeft="spacing4"
      paddingRight="spacing4"
      color="gray00"
      height="auto"
    >
      <Text variant="title2Bold" margin="spacing0" padding="spacing0">
        받는 사람
      </Text>
      <Blank height="12px" />
      <RowForm>
        <Text
          variant="body1Regular"
          margin="spacing0"
          padding="spacing0"
          marginRight="spacing6"
        >
          이름
        </Text>
        <div style={{ flex: 1 }}>
          <InputForm<FormData_v2>
            width="100%"
            height="42px"
            name="receiverName"
            placeholder="이름을 입력하세요."
            value={formData_v2.receiverName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("receiverName", e.target.value)
            }
            message={getErrorMessage_v2(hasError, "receiverName")}
            description=""
          />
        </div>
      </RowForm>
      <RowForm>
        <Text variant="body1Regular" margin="spacing0" padding="spacing0">
          전화번호
        </Text>
        <div style={{ flex: 1 }}>
          <InputForm<FormData_v2>
            width="100%"
            height="42px"
            name="receiverPhone"
            placeholder="전화번호를 입력하세요."
            value={formData_v2.receiverPhone}
            onChange={(e) => handleInputChange("receiverPhone", e.target.value)}
            message={
              phoneErrorMessage
                ? phoneErrorMessage
                : getErrorMessage_v2(hasError, "receiverPhone")
            }
            description=""
          />
        </div>
      </RowForm>
      <RowForm>
        <Text
          variant="body1Regular"
          margin="spacing0"
          padding="spacing0"
          marginRight="spacing6"
        >
          수량
        </Text>
        <div style={{ flex: 1 }}>
          <InputForm<FormData_v2>
            width="100%"
            height="42px"
            name="quantity"
            placeholder="수량을 입력하세요."
            value={formData_v2.quantity}
            type="number"
            min={1}
            max={99}
            step={1}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
            message={getErrorMessage_v2(hasError, "quantity")}
            description=""
          />
        </div>
      </RowForm>
    </Layout>
  )
}

export default PresentReciverForm
