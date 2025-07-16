import { ORDER_TEMPLATE_DATA, type OrderTemplate } from '@assets/orderTemplateData';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { OrderFormValue } from '@src_types/OrderFormValues';
import {
  StyledOrderCardContainer,
  StyledOrderCardSideScrollConntainer,
  StyledOrderTemplateContainer,
} from '@src/styles/Order/StyledOrderCardTemplateContainer';

const OrderCardTemplateContainer = () => {
  // 목 데이터 템플릿에서 선택된 템플릿을 저장하기 위한 state 값
  const [selectedTemplate, setSelectedTemplate] = useState<OrderTemplate>(ORDER_TEMPLATE_DATA[0]);
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<OrderFormValue>();

  //템플릿을 선택했을때 기본 messgae를 만들어 리렌더링하기 위한 useEffect()
  useEffect(() => {
    setValue('msg', selectedTemplate.defaultTextMessage, { shouldValidate: true });
  }, [selectedTemplate, setValue]);

  return (
    <StyledOrderTemplateContainer className='background-default margin-bottom-10'>
      <StyledOrderCardSideScrollConntainer>
        {ORDER_TEMPLATE_DATA.map((template: OrderTemplate, index: number) => (
          <img
            key={template.id}
            src={template.thumbUrl}
            alt={`템플릿 ${template.id} 썸네일`}
            className={`${selectedTemplate.id === template.id ? 'selected' : ''} ${index === 0 ? 'first-card' : ''}`}
            onClick={() => setSelectedTemplate(template)}
          />
        ))}
      </StyledOrderCardSideScrollConntainer>

      <StyledOrderCardContainer className='order-template-card'>
        <div className='card-image'>
          <img
            src={selectedTemplate.imageUrl}
            alt={`메시지 카드 ${selectedTemplate.id}`}
            loading='lazy'
          />
        </div>
        <div>
          <textarea
            {...register('msg')}
            className={`body2Regular ${errors.msg ? 'border-red' : ''}`}
            placeholder='메시지를 입력해주세요'
          />
          {errors.msg && (
            <p className='label2Regular font-red margin-left-20'>
              {errors.msg.message?.toString()}
            </p>
          )}
        </div>
      </StyledOrderCardContainer>
    </StyledOrderTemplateContainer>
  );
};

export default OrderCardTemplateContainer;
