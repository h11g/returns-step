import { IOrder, IReturn, IReturnIntention } from "@/types";
import { ReturnStep, ReturnStepConfig } from "./Step";

export interface ReturnListStepConstructorProps extends ReturnStepConfig {
  dataHooks: {
    orderProvider: () => Promise<IOrder>;
    returnsProvider: () => Promise<IReturn[]>;
    returnIntentionProvider: () => Promise<IReturnIntention>;
  },
}

export class ReturnListStep extends ReturnStep {
  private dataHooks: ReturnListStepConstructorProps['dataHooks']

  constructor({ dataHooks, ...rest }: ReturnListStepConstructorProps) {
    super(rest);
    this.dataHooks = dataHooks;
  }

  public async validate(): Promise<boolean> {
    const { orderNumber, email } = await this.dataHooks.returnIntentionProvider();
    const { orderNumber: orderNumberFromOrder } = await this.dataHooks.orderProvider();

    return orderNumber === orderNumberFromOrder;
  }

  public async shouldSkip() {
    super.shouldSkip();
    const returns = await this.dataHooks.returnsProvider();

    return Promise.resolve(returns.length === 0);
    // return Promise.resolve(false);
  }

  // public process() {
  //   return Promise.resolve();
  // }
}
