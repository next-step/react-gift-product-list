import { ClipLoader as Spinner } from "react-spinners";
import type { CSSProperties } from "react";

type Props = {
  color?: string;
  loading: boolean;
  size: number;
};

export const LoadingSpinner = ({ color = "#000000", loading, size }: Props) => {
  return (
    <Spinner
      color={color}
      loading={loading}
      cssOverride={override}
      size={size}
      data-testid="loader"
    />
  );
};

const override: CSSProperties = {
  display: "block",
  margin: "100px auto",
};
