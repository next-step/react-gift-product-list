import { zodResolver } from '@hookform/resolvers/zod';
import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import { PARAMS } from '@src/assets/params';
import { SESSION_KEY_NAME } from '@src/assets/sessionKeyName';
import { URLS } from '@src/assets/urls';
import { orderSchema } from '@src/components/Schemas/orderSchmea';
import type { GoodSummary } from '@src/types/Goods';
import type { OrderFormValue } from '@src/types/OrderFormValues';
import type { Recipient } from '@src/types/Recipient';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const getOrderFetchData = async (productId: string | null) => {
  const apiRequestData = {
    methods: 'GET' as HttpTypes,
    requestName: BASIC_ENDPOINT.product + `/${productId}/summary`,
    body: {},
    params: '',
    headers: null,
  };

  const fetchData = await apiClient(apiRequestData);
  return fetchData.data;
};

export const useOrderForm = () => {
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<GoodSummary | null>(null);
  const navigate = useNavigate();

  //url를 통해 받은 상품 id를 가지고 상품 container를 생성해 렌더링
  useEffect(() => {
    const productId = searchParams.get(PARAMS.productId);

    const fetchAndSetProduct = async () => {
      try {
        const fetchData = await getOrderFetchData(productId);
        if (fetchData && fetchData.statusCode < 500) {
          toast(fetchData.message);
          navigate(URLS.home);
        } else {
          setSelectedProduct(fetchData);
        }
      } catch (error) {
        console.error('상품 조회 중 에러 발생:', error);
        toast('상품 정보를 불러올 수 없습니다.');
        navigate(URLS.home);
      }
    };

    fetchAndSetProduct();
  }, [searchParams, navigate]);
  const methods = useForm<OrderFormValue>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      msg: '',
      msgId: '',
      sendName: '',
      recipients: [],
      total_count: 0,
    },
  });
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const onSubmit: SubmitHandler<OrderFormValue> = (data) => {
    const postOrder = async () => {
      const authToken = sessionStorage.getItem(SESSION_KEY_NAME.token) as string;
      const orderBody = {
        productId: selectedProduct?.id,
        message: data.msg,
        messageCardId: data.msgId,
        ordererName: String(data.sendName),
        receivers: data.recipients.map((recipient: Recipient) => {
          return {
            name: recipient.receiveName,
            phoneNumber: recipient.receiveTel,
            quantity: recipient.count,
          };
        }),
      };
      try {
        const apiRequestData = {
          methods: 'POST' as HttpTypes,
          requestName: BASIC_ENDPOINT.order,
          body: orderBody,
          params: '',
          headers: {
            Authorization: authToken,
          },
        };
        const fetchOrder = await apiClient(apiRequestData);
        if (fetchOrder.statusCode === 401) {
          navigate(URLS.login);
        } else if (fetchOrder.success === true) {
          alert('주문 성공');
          navigate(URLS.home);
        }
      } catch (error) {
        alert(`${error}발생`);
      }
    };
    postOrder();
  };

  const currentRecipients = watch('recipients');
  const totalCount = currentRecipients.reduce(
    (sum, recipient) => sum + Number(recipient.count || 0),
    0
  );

  useEffect(() => {
    setValue('total_count', totalCount);
  }, [currentRecipients, setValue, totalCount]);

  const totalPrice = selectedProduct ? totalCount * selectedProduct.price : 0;

  return {
    selectedProduct,
    methods,
    handleSubmit,
    control,
    errors,
    onSubmit,
    currentRecipients,
    totalPrice,
  };
};
