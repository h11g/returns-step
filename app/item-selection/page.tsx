import { Container, TextField, Flex, Card, Text } from '@radix-ui/themes';
import { getOrder, getReturnList } from '../../utils';
import Item from './Item';
import Back from '../../components/Back';

export default async function ItemSelection() {
  const order = await getOrder({ orderNumber: 'Order123', email: 'test@email.com' });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <Back />
      <Container size="4">
        <Flex direction="column" gap="3" align="center">
          {order.items.map((item) => (
            <Item key={item.id} id={item.id} name={item.name} />
          ))}
        </Flex>
      </Container>
    </main>
  );
}
