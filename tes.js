const {SVGPathData, SVGPathDataTransformer, SVGPathDataEncoder, SVGPathDataParser} = require('svg-pathdata');
var fs = require('fs');
// const s3 = require('aws-sdk/clients/s3');  //
// let data2;
// fs.readFile('https://certificates-andun.s3.amazonaws.com/svg.svg', 'utf8' , (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     // console.log(data)
//     data2 = data.replace("Name", "Andun");
//     data2 = data.replace("Signature", "AndunRanmal");
//
//
//     dom.window.document.getElementsByTagName('text')[1].textContent = "Andun"
//     console.log(dom.window.document.getElementsByTagName('text')[1].textContent)
//
//
//     console.log(data);
//     fs.writeFile('test.svg', data, (err) => {
//         // throws an error, you could also catch it here
//         if (err) throw err;
//
//         // success case, the file was saved
//         console.log('Lyric saved!');
//     });
// })
// async function readFile() {
//     try {
//         let s3Data = await readSvgFile();
//         console.log(s3Data);
//     } catch (err) {
//         console.log('Error:', err);
//     }
// }
//
// const readSvgFile = () => {
//     return new Promise(function (resolve, reject) {
//         var params = { Bucket: "certificates-andun", Key: 'svg.svg' };
//         s3Bkt.getObject(params, function (err, data) {
//             if (err) {
//                 reject(err.message);
//             } else {
//                 var data = Buffer.from(data.Body).toString('utf8');
//                 resolve(data);
//             }
//         });
//     });
// }
//
// const uploadFile = (fileName) => {
//     // Read content from the file
//     let fileContent;
//     readSvgFile().then(data => {
//         const params = {
//             Bucket: "certificates-andun",
//             Key: 'svg2.svg', // File name you want to save as in S3
//             Body: data
//         };

//         s3Bkt.upload(params, function(err, data) {
//             if (err) {
//                 throw err;
//             }
//             console.log(`File uploaded successfully. ${data.Location}`);
//         });
//     })
// };
//
// uploadFile()


