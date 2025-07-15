import Spinner from "./Spinner";

interface Props {
    loading: boolean;
    error: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
    errorFallback?: React.ReactNode;
}

export default function AsyncBoundary({
    loading,
    error,
    children,
    fallback = <Spinner />,
    errorFallback = null,
}: Props) {
    if (loading) return fallback;
    if (error) return errorFallback;
    return <>{children}</>
}