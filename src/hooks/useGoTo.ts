import { useNavigate } from 'react-router-dom';

export function useGoToHome() {
  const navigate = useNavigate();
  return () => {
    navigate('/');
  };
}

export function useGoToProfile() {
  const navigate = useNavigate();
  return () => {
    navigate('/my');
  };
}

export function useGoToOrder() {
  const navigate = useNavigate();
  return (productId: number | string) => {
    navigate(`/order/${productId}`);
  };
}

export function useGoToTheme() {
  const navigate = useNavigate();
  return (themeId: number | string) => {
    navigate(`/themes/${themeId}`);
  };
}

export function useGoBack() {
  const navigate = useNavigate();
  return () => {
    navigate(-1);
  };
}
