import { ReturnListStep } from "@/stepController/ReturnListStep";
import { useReturnIntentionStore } from "@/store";
import { getOrder, getReturnList } from "@/utils";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export function useReturnListStepInstance() {
  const router = useRouter()
  const returnListStepInstanceRef = useRef<ReturnListStep | null>()

  const {orderNumber, email} =  useReturnIntentionStore(({ returnIntention }) => {
    return { orderNumber: returnIntention.orderNumber, email: returnIntention.email }
  })

  const { returnIntention, updateReturnIntention } = useReturnIntentionStore()

  const fetchOrder = () => {
     return getOrder({orderNumber, email})
  }

  const getReturnIntention = () => {
    return Promise.resolve(returnIntention)
  }

  const fetchReturns = () => {
    return getReturnList()
  }

  if(!returnListStepInstanceRef.current) {
    returnListStepInstanceRef.current = new ReturnListStep({
      name: 'ReturnListStep',
      dataHooks: {
        orderProvider: fetchOrder,
        returnIntentionProvider: getReturnIntention,
        returnsProvider: fetchReturns,
      },
      onStepStart: () => {
        router.push('/returns')
      },
      onStepSkip: () => {
        updateReturnIntention({ itemId: 'item123' })
      },
      onStepEnd: () => {
        console.log('ReturnListStep ended')
      }
    })
  }

  return returnListStepInstanceRef.current
}
