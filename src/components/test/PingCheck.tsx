import { useEffect, useState } from 'react';
import axios from 'axios';

const PingCheck = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/ping`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.error('❌ /ping 호출 실패', err);
        setData('에러 발생');
      });
  }, []);

  return (
    <div>
      <h2>헬스 체크</h2>
      <p>서버 응답: {data}</p>
    </div>
  );
};

export default PingCheck;
