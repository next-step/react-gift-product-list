import styled from "@emotion/styled"
import type { ComponentStyle } from "@/interfaces/ComponentStyle"
import Text from "@/components/Text"
import theme from "@/styles/theme"

const InputStyle = styled.input<ComponentStyle & { hasError?: boolean }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 1px solid ${theme.colors.gray300};
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.gray900};
  }
  border: none;
  border-bottom: 1px solid
    ${({ hasError }) => (hasError ? theme.colors.red700 : theme.colors.gray700)};
`

export type InputBlankProps<T> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name"
> &
  ComponentStyle & {
    name: keyof T
    message?: string
    description?: string
    onBlur?: React.FocusEventHandler<HTMLInputElement>
  }

function InputBlank<T>({
  width,
  height,
  name,
  message,
  description,
  onBlur,
  ...props
}: InputBlankProps<T>) {
  const hasError = Boolean(message)

  return (
    <div>
      <InputStyle
        width={width}
        height={height}
        hasError={hasError}
        name={String(name)}
        onBlur={onBlur}
        {...props}
      />
      {hasError && (
        <Text
          variant="label2Regular"
          margin="spacing0"
          padding="spacing0"
          marginTop="spacing1"
          color="red700"
        >
          {message}
        </Text>
      )}
      {!hasError && description && (
        <Text
          variant="label2Regular"
          margin="spacing0"
          padding="spacing0"
          marginTop="spacing2"
          color="gray500"
        >
          {description}
        </Text>
      )}
    </div>
  )
}

export default InputBlank
