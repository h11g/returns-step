'use client';

import { useReturnProcessController } from '@/context/ReturnProcessControllerContext';
import { useReturnIntentionStore } from '@/store';
import { IVariantItem } from '@/types';
import { Container, TextField, Flex, Card, Text } from '@radix-ui/themes';

export default function Item({ id, name }: IVariantItem) {
  const { goNextStep } = useReturnProcessController()
  const { updateReturnIntention } = useReturnIntentionStore()

  return (
    <Card
      key={id}
      asChild
      style={{ width: 350 }}
      onClick={() => {
        updateReturnIntention({ itemId: 'item123' })
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
