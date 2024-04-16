'use client';

import { ArrowLeftIcon } from '@radix-ui/react-icons';

import { IconButton, Box } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

export default function Back() {
  const router = useRouter();
  return (
    <Box
      position="absolute"
      style={{ left: '32px', top: '32px' }}
      asChild
      onClick={() => {
        router.back();
      }}
    >
      <a>
        <IconButton>
          <ArrowLeftIcon width="18" height="18" />
        </IconButton>
      </a>
    </Box>
  );
}
