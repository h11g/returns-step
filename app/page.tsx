'use client';
import { Container, TextField, Flex, Button } from '@radix-ui/themes';
import { EnvelopeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useReturnIntentionStore } from '@/store';
import { getOrder } from '@/utils';
import { useReturnProcessController } from '@/context/ReturnProcessControllerContext';


export default function Home() {
  const router = useRouter();
  const {updateReturnIntention} = useReturnIntentionStore()
  const { goNextStep } = useReturnProcessController()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container size="4">
        <Flex direction="column" gap="3" align="center">
          <TextField.Root>
            <TextField.Slot>
              <EyeOpenIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              placeholder="order number"
              defaultValue="Order123"
            />
          </TextField.Root>

          <TextField.Root>
            <TextField.Slot>
              <EnvelopeClosedIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              placeholder="email"
              defaultValue="test@email.com"
            />
          </TextField.Root>

          <Button
            size="3"
            variant="soft"
            asChild
            onClick={() => {
              updateReturnIntention({ orderNumber: 'Order123', email: 'test@email.com' });
              getOrder({ orderNumber: 'Order123', email: 'test@email.com' }).then(() => {
                // router.push('/returns');
                goNextStep()
              })
            }}
          >
            <a>Edit profile</a>
          </Button>
        </Flex>
      </Container>
    </main>
  );
}
