const {Router} = require('express')
const{addNewBlogHandler,saveBlogHandler,renderBlogHandler,postCommentHandler}=require('../controllers/blogcontroller')
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
router.get('/:id',renderBlogHandler)
router.post('/',upload.single("coverImage"),saveBlogHandler)
router.post('/comment/:blogId',postCommentHandler)

module.exports=router