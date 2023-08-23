require('dotenv').config()

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')


const path = require('path')
const fs = require('fs')
const util = require('util')

const Stage = require('./models/stageModel')
const Target = require('./models/targetModel')



const s3Client = new S3Client({
    region:'us-east-2',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET

    }
})

const stagesFolderPath = './assets/stages'
const targetFolderPath = './assets/targets'

const uploadToS3 = async (filePath) => {
    const fileName = path.basename(filePath).replace(/ /g, '_')
    const fileContent = fs.readFileSync(filePath)
    const bucketname = 'kjaiphototaggingapp'

    const directoryParts = filePath.split('/')
    const directory = directoryParts[directoryParts.length - 2]

    let params = {
        Bucket: bucketname,
        Key: `images/${directory}/${fileName}`,
        Body: fileContent,
        ACL: 'public-read',
        ContentType: 'image/x-icon'
    }

   

    try {
        console.log(`Filename: ${fileName}`)
        const command = new PutObjectCommand(params)
        const response = await s3Client.send(command)
        const url = `https://${bucketname}.s3.us-east-2.amazonaws.com/${params.Key}`

        

        console.log(`upload to s3 successful, url:${url}`)
        return url
    } catch (err) {
        console.log(err)
    }
}

const upLoadTarget = async () => {
    try {
        const newTarget = new Target({

        })
    } catch (err) {

    }
}




const upLoadStage = async (name, url) => {
    const stageName = name.split('_')[0]

    const newStage = new Stage({

    })
    console.log(stageName)
}


// fs.readdir(stagesFolderPath, (err, files) => {
//     if (err) {
//         console.error('error reading folder', err)
//     }

//     files.forEach((file) => {
//         const stagesFilePath = path.join(stagesFolderPath, file)
//         uploadToS3(stagesFilePath)
//     })
// })

// fs.readdir(targetFolderPath, (err, files) => {
//     if (err) {
//         console.error('error reading folder', err)
//     }

//     files.forEach((file) => {
//         const targetFilePath = path.join(targetFolderPath, file)
//         uploadToS3(targetFilePath)
//     })
// })

const readdirAsync = util.promisify(fs.readdir)

const readMapDirectory = async (directoryPath) => {
    const subdirectories = fs.readdirSync(directoryPath)
    console.log(subdirectories)

    for (const subdir of subdirectories) {
        const subdirectoryPath = path.join(directoryPath, subdir)
        console.log(subdirectoryPath)

        const stageDirectoryPath = fs.readdirSync(subdirectoryPath)
        console.log(stageDirectoryPath)
        for (const subdir of stageDirectoryPath) {
            const mapPath = path.join(subdirectoryPath, subdir)
            console.log('mapPath', mapPath)
            if (fs.statSync(mapPath).isDirectory() && subdir === 'map') {
                try {
                    const files = await readdirAsync(mapPath)
                    for (const file of files) {
                        const targetFilePath = path.join(mapPath, file)
                        const s3Url = await uploadToS3(targetFilePath)
                        console.log('s3url ready:', s3Url)
                    }

                } catch (err) {
                    console.log(err)
                }
                // console.log('map directory located at:', mapPath)
                // fs.readdir(mapPath, (err, files) => {
                //     if (err) {
                //         console.error('error reading folder', err)
                //     }
    
                //     files.forEach((file) => {
                //         const targetFilePath = path.join(mapPath, file)
                //         const s3Url = await uploadToS3(targetFilePath)
                //         console.log('s3url ready:', s3Url)
                //     })
                // })
            } else {
                console.log('not map')
            }
        }
        
    }
}

readMapDirectory(stagesFolderPath)