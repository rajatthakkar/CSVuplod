import { Request, Response } from 'express';
import HomeController from '../controller/home.controller';
import { Router } from 'express';
import upload from '../config/multer';
const routerHome = Router();
const homeController = new HomeController()

console.log("inside router")
routerHome.get('/', (req:Request,res:Response)=>{
    console.log("inside route function")
    homeController.renderHomePage(req,res)
})

routerHome.post('/upload',upload.single('filefield'),(req:Request,res:Response)=>{
    console.log("inside file Route")
    homeController.validatedFile(req,res)
})
routerHome.get('/show/:id',(req:Request,res:Response)=>{
    console.log("inside file Route")
    homeController.showFileData(req,res)
})


export {routerHome}