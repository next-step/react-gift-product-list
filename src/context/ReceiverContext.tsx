import type { Receiver } from "@/type/order";
import {createContext, useContext, useState, type ReactNode } from "react";


type ReceiverContextType = {
    receivers : Receiver[];
    setReceivers: React.Dispatch<React.SetStateAction<Receiver[]>>;
};


const ReceiverContext= createContext<ReceiverContextType | undefined>(undefined);

export const useReceiver = () => {
    const context = useContext(ReceiverContext);
    if(!context) throw new Error ('useReceiverContext 는 ReceiverProiver 에서만 사용되어야 합니다');
    return context;
};

export const ReceiverProvider = ({children} : {children : ReactNode}) => {
    const [receivers, setReceivers] = useState<Receiver[]>([]);

    return(
        <ReceiverContext.Provider value={{receivers, setReceivers}}>
            {children}
        </ReceiverContext.Provider>
    )
}

