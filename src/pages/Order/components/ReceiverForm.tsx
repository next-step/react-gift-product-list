/** @jsxImportSource @emotion/react */
import type { Receiver, ReceiverError } from '../hooks/useReceivers';
import {
  horizontalFormStyle,
  receiverLabelStyle,
  errorInputStyle,
  errorMessageStyle,
} from '../styles/OrderPage.style';
import { useTheme } from '@emotion/react';

type Field = {
  key: keyof Receiver;
  label: string;
  type: 'text' | 'number';
  placeholder: string;
  min?: number;
};

const fields: Field[] = [
  {
    key: 'name',
    label: '이름',
    type: 'text',
    placeholder: '이름을 입력하세요',
  },
  {
    key: 'phone',
    label: '전화번호',
    type: 'text',
    placeholder: '전화번호를 입력하세요',
  },
  { key: 'quantity', label: '수량', type: 'number', placeholder: '', min: 1 },
];

type Props = {
  receiver: Receiver;
  error: ReceiverError;
  index: number;
  onChange: (index: number, field: keyof Receiver, value: string) => void;
  onRemove: () => void;
};

const ReceiverForm = ({
  receiver,
  error = {},
  index,
  onChange,
  onRemove,
}: Props) => {
  const theme = useTheme();

  if (!receiver) return null;

  return (
    <div css={{ marginTop: theme.spacing[5] }}>
      <h4
        css={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing[2],
          marginBottom: theme.spacing[2],
        }}
      >
        받는 사람 {index + 1}
        <button
          type="button"
          onClick={onRemove}
          css={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: theme.spacing[5],
          }}
        >
          X
        </button>
      </h4>

      {fields.map(({ key, label, type, placeholder, min }) => (
        <div key={key} css={horizontalFormStyle}>
          <label css={receiverLabelStyle}>{label}</label>
          <div style={{ flex: 1 }}>
            <input
              type={type}
              min={min}
              placeholder={placeholder}
              value={receiver[key] ?? ''}
              onChange={(e) => onChange(index, key, e.target.value)}
              css={error?.[key] ? errorInputStyle : undefined}
            />
            {error?.[key] && <p css={errorMessageStyle}>{error[key]}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceiverForm;
