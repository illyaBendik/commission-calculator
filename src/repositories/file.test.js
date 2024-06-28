import fs from 'fs'
import path from 'path'
import FileRepository from './file'

jest.mock('fs')

jest.mock('yargs/helpers', () => ({
  hideBin: jest.fn(() => []),
}))

jest.mock('yargs', () => {
  return jest.fn(() => ({
    option: jest.fn().mockReturnThis(),
    help: jest.fn().mockReturnThis(),
    alias: jest.fn().mockReturnThis(),
    argv: { file: 'testFilePath.json' },
  }))
})

describe('FileRepository', () => {
  let fileRepository

  beforeEach(() => {
    fileRepository = new FileRepository()
  })

  it('should read and parse the JSON file correctly', () => {
    const mockFilePath = 'testFilePath.json'
    const mockFileContent = JSON.stringify([
      { id: 1, name: 'Transaction 1' },
      { id: 2, name: 'Transaction 2' },
    ])

    fs.readFileSync.mockReturnValue(mockFileContent)

    const result = fileRepository.readJSONFile()

    expect(result).toEqual([
      { id: 1, name: 'Transaction 1' },
      { id: 2, name: 'Transaction 2' },
    ])
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.resolve(mockFilePath),
      'utf8'
    )
  })
})
