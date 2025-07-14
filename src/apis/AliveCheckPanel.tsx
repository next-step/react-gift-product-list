import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { fetchServerAlive } from "./BackEnd/apiList";

function AliveCheckPanel() {
  const [alive, setAlive] = useState(false);
  useEffect(() => {
    const update = async () => {
      setAlive(await fetchServerAlive());
    };
    update();
  }, []);

  return (
    <AliveCheckPanelWrapper>
      BE Live: {alive ? "🟢" : "🔴"}
    </AliveCheckPanelWrapper>
  );
}

const AliveCheckPanelWrapper = styled.div`
  position: fixed;
  z-index: 999; //Temporary Big Number
  background-color: rgba(200, 200, 200, 0.5);
  border-radius: 20px;
  padding: 10px;
  pointer-events: none;
`;

export default AliveCheckPanel;
