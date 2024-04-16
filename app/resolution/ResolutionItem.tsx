'use client';

import { Container, TextField, Flex, Card, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
export default function ResolutionItem({
  id,
  name,
}: {
  name: string;
  id: number;
}) {
  const router = useRouter();
  return (
    <Card key={id} asChild style={{ width: 350 }}>
      <a>
        <Text as="div" size="2" weight="bold">
          {name}
        </Text>
      </a>
    </Card>
  );
}
