import figlet from 'figlet'
import { cyan } from 'colorette'

// https://patorjk.com/software/taag/#p=display&f=Standard&t=Finished
export const brandAsciiCompressPics = (params?: {
  text?: string
  font?: figlet.Fonts
  horizontalLayout?: figlet.Options['horizontalLayout']
  width?: number
}) => {
  const {
    text = 'Compress Pics',
    font = 'Standard',
    horizontalLayout = 'fitted',
    width,
  } = params || {}

  console.log(
    cyan(
      figlet.textSync(text, {
        font,
        horizontalLayout,
        width,
      })
    )
  )
}
