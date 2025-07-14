/** @jsxImportSource @emotion/react */
import { useTheme, css, type Theme } from '@emotion/react';

type Props = {
  receivers: { name: string; phone: string; quantity: number }[];
};

const tableStyle = (theme: Theme) => css`
  width: 100%;
  border-collapse: collapse;
  background-color: ${theme.color.gray.gray100};
  border-radius: 8px;
  overflow: hidden;
`;

const headerRowStyle = (theme: Theme) => css`
  background-color: ${theme.color.gray.gray300};
  text-align: left;
`;

const thStyle = (theme: Theme) => css`
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
`;

const trStyle = (theme: Theme) => css`
  border-top: 1px solid ${theme.color.gray.gray100};
`;

const tdStyle = (theme: Theme) => css`
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
`;

const ReceiverTable = ({ receivers }: Props) => {
  const theme = useTheme();

  return (
    <table css={tableStyle(theme)}>
      <thead>
        <tr css={headerRowStyle(theme)}>
          <th css={thStyle(theme)}>이름</th>
          <th css={thStyle(theme)}>전화번호</th>
          <th css={thStyle(theme)}>수량</th>
        </tr>
      </thead>
      <tbody>
        {receivers.map((r, i) => (
          <tr key={i} css={trStyle(theme)}>
            <td css={tdStyle(theme)}>{r.name}</td>
            <td css={tdStyle(theme)}>{r.phone}</td>
            <td css={tdStyle(theme)}>{r.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReceiverTable;
