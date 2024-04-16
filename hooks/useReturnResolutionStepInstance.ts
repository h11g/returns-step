import { ReturnResolutionStep } from "@/stepController/ReturnResolutionStep";
import { useReturnIntentionStore } from "@/store";
import { getReturnResolution } from "@/utils";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export function useReturnResolutionStepInstance() {
  const router = useRouter()
  const returnResolutionStepInstanceRef = useRef<ReturnResolutionStep | null>()
  const itemId = useReturnIntentionStore(({ returnIntention }) => ({ itemId: returnIntention.itemId }))

  const fetchMatchedResolution = () => {
    return getReturnResolution({ itemId })
  }

  if(!returnResolutionStepInstanceRef.current) {
    returnResolutionStepInstanceRef.current = new ReturnResolutionStep({
      name: 'ReturnResolutionStep',
      dataHooks: {
        resolutionProvider: fetchMatchedResolution
      },
      onStepStart: () => {
        router.push('/resolution')
      },
      onStepSkip: () => {
        console.log('ReturnResolutionStep skipped')
      },
      onStepEnd: () => {
        console.log('ReturnResolutionStep ended')
      }
    })
  }

  return returnResolutionStepInstanceRef.current
}
