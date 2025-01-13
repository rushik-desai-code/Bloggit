const {Router} = require('express')
const{addNewBlogHandler,saveBlogHandler}=require('../controllers/blogcontroller')
const multer=require('multer')
const path=require('path')

const router= Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
})
  
const upload = multer({ storage: storage })

router.get('/add-new',addNewBlogHandler)
router.post('/',upload.single("coverImage"),saveBlogHandler)

module.exports=router