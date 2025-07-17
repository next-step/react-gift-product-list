import CheerUpPanel from "@src/components/CheerUpPanel";
import GiftThemePanel from "@src/components/GiftThemePanel";
import RealTimeRankPanel from "@src/components/RealTimeRankPanel/RealTimeRankPanel";
import RecipientSelector from "@src/components/RecipientSelector";
import ToastContext from "@src/contexts/ToastContext";
import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function Mainpage() {
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    console.log(toastContext!.message.value);
    if (toastContext!.message.value) {
      toast(toastContext!.message.value, {
        type: "error",
        position: "bottom-center"
      });
      toastContext!.message.setValue(null);
    }
  }, [toastContext!.message.value]);

  return (
    <>
      <RecipientSelector />
      <GiftThemePanel />
      <CheerUpPanel />
      <RealTimeRankPanel />
      <ToastContainer />
    </>
  );
}

export default Mainpage;
