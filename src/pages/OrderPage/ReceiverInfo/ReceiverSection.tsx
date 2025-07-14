import { useFieldArray, useFormContext } from 'react-hook-form';
import SectionTitle from '@/components/SectionTitle';
import Modal from '@/components/Modal';
import ReceiverModal from './ReceiverModal';
import { useState } from 'react';

const ReceiverSection = () => {
    const { register, control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name: 'receivers' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const receivers = watch('receivers');

    return (
        <div>
            <SectionTitle title="받는 사람" />
            {receivers.length === 0 && (
                <p>받는 사람이 없습니다. 받는 사람을 추가해주세요.</p>
            )}
            {fields.map((field, index) => (
                <div key={field.id}>
                    <p>받는 사람 {index + 1}</p>
                    <button type="button" onClick={() => remove(index)}>❌</button>
                    <div>
                        <label>이름</label>
                        <input {...register(`receivers.${index}.receiverName`)} />
                    </div>
                    <div>
                        <label>전화번호</label>
                        <input {...register(`receivers.${index}.receiverPhone`)} />
                    </div>
                    <div>
                        <label>수량</label>
                        <input
                            type="number"
                            {...register(`receivers.${index}.quantity`, { valueAsNumber: true })}
                        />
                    </div>
                </div>
            ))}
            <button type="button" onClick={() => setIsModalOpen(true)}>추가</button>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <ReceiverModal
                        onAdd={(data) => {
                            append(data);
                            setIsModalOpen(false);
                        }}
                        onClose={() => setIsModalOpen(false)}
                        disabled={fields.length >= 10}
                    />
                </Modal>
            )}
        </div>
    );
};

export default ReceiverSection;
