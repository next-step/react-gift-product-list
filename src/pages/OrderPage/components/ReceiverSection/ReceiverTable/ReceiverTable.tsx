import type { Receiver } from "@/types/Receiver";
import { TABLE_CELL_CONSTANTS } from "../../../constants/table";
import {
  ReceiverTableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
} from "./ReceiverTable.styles";

interface ReceiverTableProps {
  receivers: Receiver[];
}

function ReceiverTable({ receivers }: ReceiverTableProps) {
  return (
    <ReceiverTableContainer>
      <TableHeader>
        <TableHeaderCell>{TABLE_CELL_CONSTANTS.NAME}</TableHeaderCell>
        <TableHeaderCell>{TABLE_CELL_CONSTANTS.PHONE}</TableHeaderCell>
        <TableHeaderCell>{TABLE_CELL_CONSTANTS.QUANTITY}</TableHeaderCell>
      </TableHeader>
      {receivers.map((receiver) => (
        <TableRow key={receiver.phoneNumber}>
          <TableCell>{receiver.name}</TableCell>
          <TableCell>{receiver.phoneNumber}</TableCell>
          <TableCell>{receiver.quantity}</TableCell>
        </TableRow>
      ))}
    </ReceiverTableContainer>
  );
}

export default ReceiverTable;
