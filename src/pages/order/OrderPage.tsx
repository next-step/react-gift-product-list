import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { cardTemplates } from "@/features/order/constants/cardTemplate";
import {
    ReceiverContextProvider,
    useReceiverContext,
} from "@/features/order/contexts/ReceiverContext";
import { useOrder } from "@/features/order/hooks/useOrder";
import { useCreateOrder } from "@/features/order/services/createOrder";
import { useProductSummaryByProductId } from "@/features/order/services/getProductSummaryByProductId";
import { LetterCard } from "@/features/order/ui/LetterCard";
import { ProductInfo } from "@/features/order/ui/ProductInfo";
import { ReceiverList } from "@/features/order/ui/ReceiverList";
import { ReceiverModal } from "@/features/order/ui/ReceiverModal";

import NotFoundPage from "@/pages/NotFoundPage";

import { ModalProvider } from "@/shared/context/ModalContext";
import withProviders from "@/shared/helpers/withProviders";
import { useModal } from "@/shared/hooks/useModal";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui/Input";
import { Spinner } from "@/shared/ui/Spinner";
import { TextArea } from "@/shared/ui/TextArea";

import { VerticalSpacing } from "@/widgets/layouts/Spacing.styled";

import * as Styles from "./OrderPage.styled";

function OrderPage() {
    const { id } = useParams();

    const modal = useModal();
    const { nickname } = useAuth();
    const {
        receivers: { receivers },
    } = useReceiverContext();
    const { orderRefs, validationErrors, submit: validate } = useOrder();
    const { isPending, data: product } = useProductSummaryByProductId(Number(id));
    const { request: createOrder } = useCreateOrder();

    const [selectedLetterCardId, setSelectedLetterCardId] = useState<number>(cardTemplates[0].id);

    const letterCard = useMemo(
        () => cardTemplates.find((cardTemplate) => cardTemplate.id === selectedLetterCardId),
        [selectedLetterCardId],
    );

    const totalQuantity = useMemo(() => {
        return receivers.reduce((total, receiver) => total + receiver.quantity, 0);
    }, [receivers]);

    const onSubmitButtonClick = () => {
        validate();
        createOrder({
            productId: Number(id),
            messageCardId: String(letterCard?.id),
            message: String(orderRefs.message.current?.value),
            ordererName: String(orderRefs.senderName.current?.value),
            receivers: receivers.map((receiver) => ({
                name: receiver.receiverName,
                phoneNumber: receiver.phoneNumber,
                quantity: receiver.quantity,
            })),
        });
    };

    if (!id) return <NotFoundPage />;

    return (
        <Styles.Container>
            <Styles.LetterCardContainer>
                {cardTemplates.map((cardTemplate) => {
                    return (
                        <LetterCard
                            key={cardTemplate.id}
                            isSelected={cardTemplate.id === selectedLetterCardId}
                            imgSrc={cardTemplate.thumbUrl}
                            onClick={() => setSelectedLetterCardId(cardTemplate.id)}
                        />
                    );
                })}
            </Styles.LetterCardContainer>

            <VerticalSpacing size="12px" />

            <Styles.PreviewContainer>
                <Styles.Preview src={letterCard?.imageUrl} />
            </Styles.PreviewContainer>

            <VerticalSpacing size="40px" />

            <Styles.FieldSet>
                <TextArea
                    ref={orderRefs.message}
                    height="65px"
                    placeholder="메시지를 입력해주세요."
                    defaultValue={letterCard?.defaultTextMessage}
                    error={validationErrors.message}
                />
            </Styles.FieldSet>

            <VerticalSpacing size="32px" />
            <VerticalSpacing size="8px" backgroundColor="#f3f4f5" />

            <Styles.FieldSet>
                <Styles.Legend>보내는 사람</Styles.Legend>
                <Input
                    ref={orderRefs.senderName}
                    placeholder="이름을 입력하세요."
                    error={validationErrors.senderName}
                    defaultValue={nickname}
                />
            </Styles.FieldSet>

            <VerticalSpacing size="32px" />
            <VerticalSpacing size="8px" backgroundColor="#f3f4f5" />

            <Styles.FieldSet>
                <Styles.ReceiverLabel>
                    <Styles.Legend>받는 사람</Styles.Legend>
                    <Button
                        variant="secondary"
                        width="56px"
                        height="35px"
                        onClick={() => modal.open(<ReceiverModal />)}
                    >
                        {receivers.length !== 0 ? "수정" : "추가"}
                    </Button>
                </Styles.ReceiverLabel>

                <ReceiverList />

                <VerticalSpacing size="24px" />
            </Styles.FieldSet>

            <VerticalSpacing size="8px" backgroundColor="#f3f4f5" />

            <Styles.FieldSet>
                <Styles.Legend>상품 정보</Styles.Legend>
                {isPending || !product ? (
                    <Spinner />
                ) : (
                    <ProductInfo
                        imgSrc={product.imageURL}
                        productName={product.name}
                        brandName={product.brandName}
                        price={product.price}
                    />
                )}
            </Styles.FieldSet>

            <VerticalSpacing size="60px" />

            {createPortal(
                <Styles.OrderButton onClick={() => onSubmitButtonClick()}>
                    {product && (product.price * totalQuantity).toLocaleString()}원 주문하기
                </Styles.OrderButton>,
                document.body as HTMLElement,
            )}
        </Styles.Container>
    );
}

export default withProviders([<ReceiverContextProvider />, <ModalProvider />], OrderPage);
