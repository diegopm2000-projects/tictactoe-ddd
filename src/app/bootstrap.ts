import { App } from './app'

export async function init(): Promise<void> {
  await App.getInstance().init()
}
