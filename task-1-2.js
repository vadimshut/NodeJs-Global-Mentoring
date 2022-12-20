import csvPkg from 'csvtojson'
import { createReadStream, createWriteStream } from 'fs'

const FILE_TO_READ = './csv/data.csv'
const FILE_TO_WRITE = './textFile.txt'

const readStream = createReadStream(FILE_TO_READ)
const writeStream = createWriteStream(FILE_TO_WRITE)
readStream
  .pipe(csvPkg.csv({ trim: true, ignoreColumns: /Amount/ }))
  .pipe(writeStream)

readStream.on('error', (error) => {
  console.log('ERROR readStream: ', error)
})

writeStream.on('error', (error) => {
  console.log('ERROR writeStream: ', error)
})

csvPkg.csv().on('error', (error) => {
  console.log(error)
})
