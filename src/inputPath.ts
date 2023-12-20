import inquirer from 'inquirer'
import inquirerFuzzyPath from 'inquirer-fuzzy-path'

export const getFolderPath: () => Promise<{
  path: string
}> = () => {
  inquirer.registerPrompt('fuzzyPath', inquirerFuzzyPath)
  return inquirer.prompt([
    {
      type: 'fuzzyPath',
      name: 'path',
      excludePath: (nodePath: any) =>
        nodePath.startsWith('node_modules') || nodePath.startsWith('.git'),
      // excludePath :: (String) -> Bool
      // excludePath to exclude some paths from the file-system scan
      excludeFilter: (nodePath: any) => nodePath == '.',
      // excludeFilter :: (String) -> Bool
      // excludeFilter to exclude some paths from the final list, e.g. '.'
      itemType: 'directory',
      // itemType :: 'any' | 'directory' | 'file'
      // specify the type of nodes to display
      // default value: 'any'
      // example: itemType: 'file' - hides directories from the item list
      rootPath: './',
      // rootPath :: String
      // Root search directory
      message: 'Select your images directory:',
      // default: './',
      suggestOnly: false,
      // suggestOnly :: Bool
      // Restrict prompt answer to available choices or use them as suggestions
      depthLimit: 10,
      // depthLimit :: integer >= 0
      // Limit the depth of sub-folders to scan
      // Defaults to infinite depth if undefined
      pageSize: 20,
    },
  ])
}
