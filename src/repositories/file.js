import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export default class FileRepository {
  readJSONFile() {
    const { file: filePath } = yargs(hideBin(process.argv))
      .option('file', {
        alias: 'f',
        description: 'Path to the input JSON file',
        type: 'string',
        demandOption: true,
      })
      .help()
      .alias('help', 'h').argv

    const transactions = JSON.parse(
      fs.readFileSync(path.resolve(filePath), 'utf8')
    )
    return transactions
  }
}
