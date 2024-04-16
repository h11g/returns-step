import { Container, TextField, Flex, Card, Text } from '@radix-ui/themes';
import { getReturnList, getReturnResolution } from '../../utils';
import ResolutionItem from './ResolutionItem';
import Back from '../../components/Back';

export default async function Resolution() {
  const resolution = await getReturnResolution({ itemId: 'return123' });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Back />
      <Container size="4">
        <Flex direction="column" gap="3" align="center">
          {resolution.map((item) => (
            <ResolutionItem key={item.id} id={item.id} name={item.name} />
          ))}
        </Flex>
      </Container>
    </main>
  );
}
