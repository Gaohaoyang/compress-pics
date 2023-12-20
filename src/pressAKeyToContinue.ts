import inquirer from 'inquirer'
import PressToContinuePrompt from 'inquirer-press-to-continue'
import type { KeyDescriptor } from 'inquirer-press-to-continue'

export const pressAKeyToContinue = () => {
  inquirer.registerPrompt('press-to-continue', PressToContinuePrompt)
  return inquirer.prompt<{ key: KeyDescriptor }>({
    name: 'key',
    type: 'press-to-continue',
    enter: true,
  })
}
