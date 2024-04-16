import { IReturnStep } from './Step';

export default class StepController {
  private steps: IReturnStep[];
  private currentIndex: number
  private historyStack: number[] = []

  constructor(steps: IReturnStep[]) {
    this.steps = steps;

    this.currentIndex = 0;
    this.historyStack.push(this.currentIndex)
    this.currentStep.process();
  }

  get currentStep() {
    return this.steps[this.currentIndex];
  }

  private switchStep(index: number) {
		this.historyStack.push(this.currentIndex)

		this.currentIndex = index;
	}

  async processNextStep() {
    if(await this.currentStep.validate()) {
      this.currentStep.onEnd();

      const nextStep = this.steps[this.currentIndex + 1]
      console.log('%c [ nextStep ]', 'font-size:13px; background:pink; color:#bf2c9f;', nextStep)

      if(!nextStep) return;

      this.switchStep(this.currentIndex + 1)

      if(await nextStep.shouldSkip()) {
        nextStep.onSkip();
        await this.processNextStep();
      } else {
        await nextStep.process();
      }
    }
    // const nextStep = this.currentStep.setNext(this.steps[this.currentIndex + 1]);
    // if (nextStep) {
    //   this.setCurrentStep = this.currentIndex + 1;
    //   nextStep.process();
    // }
  }
}
