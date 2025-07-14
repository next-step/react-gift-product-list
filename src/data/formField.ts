/**
 * label은 React key로 사용되므로 중복되지 않게 선언할 것
 * @see ReceiverForm 컴포넌트에서 key={formField.label}로 사용됨
 */
export const formField = [
    {
      label: '이름',
      placeholder: '이름을 입력하세요.',
      field: 'name' as const,
      type: 'text' as const,
      registerOptions: undefined,
    },
    {
      label: '전화번호',
      placeholder: ' - 없이 01012345678 형식으로 입력하세요.',
      field: 'phone' as const,
      type: 'tel' as const,
      registerOptions: undefined,
    },
    {
      label: '수량',
      placeholder: '수량을 입력하세요.',
      field: 'quantity' as const,
      type: 'number' as const,
      registerOptions: { valueAsNumber: true },
    },
  ] as const;