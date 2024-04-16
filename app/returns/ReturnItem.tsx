'use client';

import { useReturnProcessController } from '@/context/ReturnProcessControllerContext';
import { Container, TextField, Flex, Card, Text } from '@radix-ui/themes';

export default function ReturnItem({ id, name }: { name: string; id: number }) {
  const { goNextStep } = useReturnProcessController()

  return (
    <Card
      key={id}
      asChild
      style={{ width: 350 }}
      onClick={() => {
        goNextStep()
      }}
    >
      <a>
        <Text as="div" size="2" weight="bold">
          {name}
        </Text>
      </a>
    </Card>
  );
}
