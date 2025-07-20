import { SESSION_KEY_NAME } from '@src/assets/sessionKeyName';
import {
  StyledSendPersonContainer,
  SyltedOrderInput,
} from '@src/components/Order/Container/StyledOrderContainer';
import type { OrderFormValue } from '@src/types/OrderFormValues';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const SenderContainer = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<OrderFormValue>();

  useEffect(() => {
    const name = sessionStorage.getItem(SESSION_KEY_NAME.username as string);
    setValue('sendName', String(name));
  });
  return (
    <StyledSendPersonContainer className='send-person background-default margin-bottom-10'>
      <div>
        <p className='title2Bold'>보내는 사람</p>
      </div>
      <div>
        <SyltedOrderInput
          id='sendName'
          type='text'
          {...register('sendName')}
          className={errors.sendName ? 'border-red' : ''}
          placeholder='이름을 입력하세요'
        />
        {errors.sendName && (
          <p className='margin-left-20 label2Regular font-red'>
            {errors.sendName.message?.toString()}
          </p>
        )}
        {!errors.sendName && (
          <p className='margin-left-20 label2Regular'>
            * 실제 선물 발송시 발신자이름으로 반영되는 정보입니다.
          </p>
        )}
      </div>
    </StyledSendPersonContainer>
  );
};

export default SenderContainer;
