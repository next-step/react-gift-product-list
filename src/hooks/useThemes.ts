import { useEffect, useState } from "react";
import { fetchThemes, type Theme } from "@/apis/fetchThemes";

export function useThemes() {
    const [themes, setThemes] = useState<Theme[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchThemes()
            .then((data) => {
                setThemes(data);
                setError(false);
            })
            .catch(() => {
                setThemes(null);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    return { themes, loading, error };
}