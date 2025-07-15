import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Theme {
    themeId: number;
    name: string;
    image: string;
}

interface ApiResponse {
    data: Theme[];
}

export const useGetThemes = () => {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await axios.get<ApiResponse>(`${import.meta.env.VITE_API_BASE_URL}/api/themes`);
                setThemes(response.data.data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchThemes();
    }, []);

    return { themes, loading, error };
};
