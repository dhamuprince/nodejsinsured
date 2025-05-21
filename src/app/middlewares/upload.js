import multer from 'multer';
import path from 'path';
import UploadConstants from '../config/Constants.js';

const UPLOAD_DOC_DIR = UploadConstants.documentUploadPath;
const documentArray = UploadConstants.documentFormatArray;
const maxDocumentSize = UploadConstants.uploadSizeLimit.document;

let filetype='';

const storage = multer.diskStorage({
    destination: function(req,file,callback){
        let ext = path.extname(file.originalname);
        if(documentArray.includes(ext)){

            callback(null, UPLOAD_DOC_DIR);
        }
    },
    filename: function(req,file,callback){
        let file_ext = path.extname(file.originalname);
        if(documentArray.includes(file_ext)){
            filetype = 'DOC';
            callback(null, filetype+ "_" + Date.now()+path.extname(file.originalname));
        }
    }
});

let uploadFile = multer({
    storage:storage,
    fileFilter:fileFilter
});


function fileFilter(req, file ,callback){
    
     let fileSizeValue = req.headers['content-length'];
     let fileValueInKB = fileSizeValue / 1024;
    let ext = path.extname(file.originalname);
    if(documentArray.includes(ext)){

        if(fileValueInKB < maxDocumentSize){
            
            callback(null, true);
        }
        else{
        return callback(new Error(`Document Upload Maximum size limit is ${maxDocumentSize / 1024}MB Only!`), false);
        }
    }
    else{
         return  callback(new Error(`Uploaded File Format Doesnot Supported!`), false);
    }
}


export default uploadFile;