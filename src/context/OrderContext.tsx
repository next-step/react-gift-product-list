import useFormInput from "@/hook/useFormInput";
import { validateName} from "@/utils/validateInput";
import React, { createContext, useContext, useMemo, useState } from "react";

interface OrderContextType {
    senderNameInput: ReturnType<typeof useFormInput>;
    cardMessage : string
    setCardMessage : (msg:string) => void
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderContextProvider = ({ children }: { children: React.ReactNode }) => {
    const senderNameInput = useFormInput(validateName)
    const [cardMessage, setCardMessage] = useState('축하해요.');

    const value = useMemo(()=>({
        senderNameInput,
        cardMessage, 
        setCardMessage
    }),[senderNameInput,cardMessage, setCardMessage]);
    
return (
    <OrderContext.Provider
        value={value}
    >
        {children}
    </OrderContext.Provider>
)
}

export const useOrder = () =>{
    const context = useContext(OrderContext)
    if(!context){
        throw new Error('useOrfer 은 <OrderProvider> 에서만 써야 합니다')
    }

    return context;
}

