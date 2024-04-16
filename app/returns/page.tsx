import { Container, TextField, Flex, Card, Text } from '@radix-ui/themes';
import { getReturnList } from '../../utils';
import ReturnItem from './ReturnItem';
import Back from '../../components/Back';

export default async function Returns() {
  const returns = await getReturnList();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <Back />
      <Container size="4">
        <Flex direction="column" gap="3" align="center">
          {returns.map((item) => (
            <ReturnItem key={item.id} id={item.id} name={item.name} />
          ))}
        </Flex>
      </Container>
    </main>
  );
}
