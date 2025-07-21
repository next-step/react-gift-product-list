import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import { SESSION_KEY_NAME } from '@src/assets/sessionKeyName';
import { URLS } from '@src/assets/urls';
import type { HttpsFailedResponseTypes } from '@src/types/LoginFetchDataType';
import type { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

export const handleLoginLogic = async (id: string, pw: string, navigate: NavigateFunction) => {
  const formBody = {
    email: id,
    password: pw,
  };
  const apiRequestData = {
    methods: 'POST' as HttpTypes,
    requestName: BASIC_ENDPOINT.login,
    body: formBody,
    params: '',
    headers: null,
  };
  const fetchData = await apiClient(apiRequestData);

  if ((fetchData as HttpsFailedResponseTypes) && fetchData.statusCode < 500) {
    toast(fetchData.message);
  } else {
    sessionStorage.setItem(SESSION_KEY_NAME.email, fetchData.email);
    sessionStorage.setItem(SESSION_KEY_NAME.username, fetchData.name);
    sessionStorage.setItem(SESSION_KEY_NAME.token, fetchData.authToken);

    const redirectProductId = sessionStorage.getItem('redirectProductId');
    if (redirectProductId) {
      sessionStorage.removeItem('redirectProductId');
      navigate(`${URLS.order}?productId=${redirectProductId}`);
    } else {
      navigate(URLS.home);
    }
  }
};
