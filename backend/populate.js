require('dotenv').config()

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const mongoose = require('mongoose')

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

const mongodb = process.env.MONGO_LOGIN

const main = async () => {
    try {
        await mongoose.connect(mongodb)
        console.log('mongo connected')
        readMapDirectory(stagesFolderPath)
    } catch (err) {
        console.log(err)
    }
}

main()

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
        return {fileName, url}
    } catch (err) {
        console.log(err)
    }
}

const upLoadTarget = async (obj) => {
    const targetName = obj.fileName.split('.')[0]
    try {
        const newTarget = new Target({
            name: targetName,
            imgUrl: obj.url
        })

        await newTarget.save()
        console.log(`target ${targetName} saved to mongo`)
    } catch (err) {
        console.log(err)
    }
}




const upLoadStage = async (obj) => {
    const stageName = obj.fileName.split('_')[0]

    try {
        const newStage = new Stage({
            name: stageName,
            stageUrl: obj.url
        })
        await newStage.save()
        console.log(`stage ${stageName} saved to mongo`)
    } catch (err) {
        console.log(err)
    }

    


    console.log(`${stageName} saved successfully`)
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
                        const s3Url = await uploadToS3(targetFilePath, )
                        console.log('s3url ready:', s3Url)

                        upLoadStage(s3Url)
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
            } else if (fs.statSync(mapPath).isDirectory() && subdir === 'targets') {
                try {
                    const files = await readdirAsync(mapPath)
                    for (const file of files) {
                        const targetFilePath = path.join(mapPath, file)
                        const s3Url = await uploadToS3(targetFilePath)
                        console.log('s3url ready:', s3Url)

                        upLoadTarget(s3Url)
                        
                        
                    }
                    
                } catch (err) {

                }
            }
            
            else {
                console.log('not map or targets')
            }
        }
        
    }
}

