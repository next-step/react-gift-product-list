import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import NavigationBar from '@/components/navigation-bar/NavigationBar';
import CardSelect from '@/components/order/CardSelect';
import GiftForm from '@/components/order/OrderInfo';

const Order = () => {
  const [templateMessage, setTemplateMessage] = useState('');

  return (
    <Layout>
      <NavigationBar />
      <CardSelect setTemplateMessage={setTemplateMessage} />
      <GiftForm templateMessage={templateMessage} />
    </Layout>
  );
};

export default Order;
