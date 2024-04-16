import { IOrder, IReturn, IReturnIntention } from "@/types";
import { ReturnStep, ReturnStepConfig } from "./Step";

export interface ItemSelectionStepConstructorProps extends ReturnStepConfig {
  dataHooks: {
    orderProvider: () => Promise<IOrder>;
    returnIntentionProvider: () => Promise<IReturnIntention>;
  },
}

export class ItmeSelectionStep extends ReturnStep {
  private dataHooks: ItemSelectionStepConstructorProps['dataHooks']

  constructor({ dataHooks, ...rest }: ItemSelectionStepConstructorProps) {
    super(rest);
    this.dataHooks = dataHooks;
  }

  public async validate(): Promise<boolean> {
    const { orderNumber, email, itemId } = await this.dataHooks.returnIntentionProvider();
    console.log('%c [ itemId ]', 'font-size:13px; background:pink; color:#bf2c9f;', itemId)

    return !!itemId;
  }

  public async shouldSkip() {
    return super.shouldSkip();
    // const returns = await this.dataHooks.returnsProvider();
    // console.log('%c [ returns ]', 'font-size:13px; background:pink; color:#bf2c9f;', returns)
    // return Promise.resolve(returns.length === 0);
    // return Promise.resolve(false);
  }

  // public process() {
  //   return Promise.resolve();
  // }
}
