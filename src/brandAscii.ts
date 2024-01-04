import figlet from 'figlet'
import { cyan } from 'colorette'

// https://patorjk.com/software/taag/#p=display&f=Standard&t=Finished
export const brandAsciiCompressPics = (
  text: string = 'Compress Pics',
  font: figlet.Fonts = 'Jazmine'
) => {
  console.log(
    cyan(
      figlet.textSync(text, {
        font,
      })
    )
  )
}
