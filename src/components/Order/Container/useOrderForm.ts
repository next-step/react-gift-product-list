import { zodResolver } from '@hookform/resolvers/zod';
import { apiClient } from '@src/api/FetchData';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import { PARAMS } from '@src/assets/params';
import { orderSchema } from '@src/components/Schemas/orderSchmea';
import type { GoodSummary } from '@src/types/Goods';
import type { OrderFormValue } from '@src/types/OrderFormValues';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const getOrderFetchData = async (productId: string | null) => {
  const fetchData = await apiClient(
    'GET',
    BASIC_ENDPOINT.product + `/${productId}/summary`,
    null,
    ''
  );

  return fetchData.data;
};

export const useOrderForm = () => {
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<GoodSummary | null>(null);

  //url를 통해 받은 상품 id를 가지고 상품 container를 생성해 렌더링
  useEffect(() => {
    const productId = searchParams.get(PARAMS.productId);

    const fetchAndSetProduct = async () => {
      const fetchData = await getOrderFetchData(productId);

      if (fetchData && fetchData.statusCode < 500) {
        console.log('0');
      } else {
        setSelectedProduct(fetchData);
      }
    };

    fetchAndSetProduct();
  }, [searchParams]);
  const methods = useForm<OrderFormValue>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      msg: '',
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
    alert(`Name: ${data.sendName}, Message: ${data.msg}`);
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
