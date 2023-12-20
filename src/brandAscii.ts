import figlet from 'figlet'
import { cyan } from 'colorette'

export const brandAsciiCompressPics = (text: string = 'Compress Pics') => {
  console.log(
    cyan(
      figlet.textSync('Compress Pics', {
        font: 'Jazmine',
      })
    )
  )
}
