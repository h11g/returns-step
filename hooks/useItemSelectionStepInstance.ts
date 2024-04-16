import { ItmeSelectionStep } from "@/stepController/ItemSelectionStep";
import { ReturnOrderLookupStep } from "@/stepController/OrderLookupStep";
import { useReturnIntentionStore } from "@/store";
import { getOrder } from "@/utils";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export function useItmeSelectionStepInstance() {
  const router = useRouter()
  const ItmeSelectionStepInstanceRef = useRef<ItmeSelectionStep | null>()
  const { returnIntention } = useReturnIntentionStore()

  const {orderNumber, email} =  useReturnIntentionStore(({ returnIntention }) =>
  ({ orderNumber: returnIntention.orderNumber, email: returnIntention.email }))

  const fetchOrder = () => {
    return getOrder({orderNumber, email})
 }

  const getReturnIntention = () => {
    return Promise.resolve(returnIntention)
  }

  if(!ItmeSelectionStepInstanceRef.current) {
    ItmeSelectionStepInstanceRef.current = new ItmeSelectionStep({
      name: 'ItmeSelectionStep',
      dataHooks: {
        orderProvider: fetchOrder,
        returnIntentionProvider: getReturnIntention,
      },
      onStepStart: () => {
        router.push('/item-selection')
      },
      onStepSkip: () => {
        console.log('ItmeSelectionStep skipped')
      },
      onStepEnd: () => {
        console.log('ItmeSelectionStep ended')
      }
    })
  }

  return ItmeSelectionStepInstanceRef.current
}
