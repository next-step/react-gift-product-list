import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import { useState } from "react";
import ReceiverModal from "./ReceiverModal";
import type { Receiver } from "@/types/order";
import React from "react";

type ReceiverFormProps = {
  receiverList: Receiver[];
  setReceiverList: React.Dispatch<React.SetStateAction<Receiver[]>>;
};

export default function ReceiverForm({
  receiverList,
  setReceiverList,
}: ReceiverFormProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <ReceiverBox>
      <Spacing height="12px" />
      <ReceiverWrapper>
        <ReceiverText>받는 사람</ReceiverText>
        <AddBtn onClick={() => setModalOpen(true)}>
          {receiverList.length > 0 ? "수정" : "추가"}
        </AddBtn>
      </ReceiverWrapper>
      <Spacing height="12px" />
      {receiverList.length === 0 ? (
        <EmptyWrapper>
          <EmptyText>
            받는 사람이 없습니다.
            <br />
            받는 사람을 추가해주세요.
          </EmptyText>
        </EmptyWrapper>
      ) : (
        <TableWrapper>
          <thead>
            <tr>
              <HeaderText>이름</HeaderText>
              <HeaderText>전화번호</HeaderText>
              <HeaderText>수량</HeaderText>
            </tr>
          </thead>
          <tbody>
            {receiverList.map((r) => (
              <tr key={r.phone}>
                <td>
                  <BodyText>{r.name}</BodyText>
                </td>
                <td>
                  <BodyText>{r.phone}</BodyText>
                </td>
                <td>
                  <BodyText>{r.quantity}</BodyText>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}
      {isModalOpen && (
        <ReceiverModal
          initialReceivers={receiverList}
          onClose={() => setModalOpen(false)}
          onComplete={(updated) => {
            setReceiverList(updated);
            setModalOpen(false);
          }}
        />
      )}
      <Spacing height="24px" />
    </ReceiverBox>
  );
}

const ReceiverBox = styled.div`
  width: 100%;
  padding: 0px 1rem;
`;

const ReceiverWrapper = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const ReceiverText = styled.p`
  ${({ theme }) => theme.typography.title2Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
  white-space: nowrap;
`;

const AddBtn = styled.button`
  ${({ theme }) => theme.typography.label1Regular};
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  border: none;
  cursor: pointer;
  transition:
    background-color 200ms,
    opacity 200ms;
  white-space: nowrap;
`;

const EmptyWrapper = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 8px;
`;

const EmptyText = styled.p`
  ${({ theme }) => theme.typography.label1Regular};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 8px;
  overflow: hidden;
`;

const HeaderText = styled.th`
  ${({ theme }) => theme.typography.label1Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
  text-align: left;
`;

const BodyText = styled.td`
  ${({ theme }) => theme.typography.label1Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;
