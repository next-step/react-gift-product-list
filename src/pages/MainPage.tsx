import CheerUpPanel from "@src/components/CheerUpPanel";
import GiftThemePanel from "@src/components/GiftThemePanel";
import RealTimeRankPanel from "@src/components/RealTimeRankPanel/RealTimeRankPanel";
import RecipientSelector from "@src/components/RecipientSelector";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Mainpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("err");

  useEffect(() => {
    if (message) {
      toast(message, {
        type: "error",
        position: "bottom-center"
      });
    }

    searchParams.delete("err");
    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString()
      },
      { replace: true }
    );
  }, []);

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
