import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesCotroller } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import multer from "multer";
import { Router } from "express";
const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesCotroller();

const upload = multer(uploadConfig);

carRoutes.post(
	"/",
	ensureAuthenticated,
	ensureAdmin,
	createCarController.handle
);

carRoutes.get(
	"/available",
	listAvailableCarsController.handle
)

carRoutes.post(
	"/specifications/:id",
	ensureAuthenticated,
	ensureAdmin,
	createCarSpecificationController.handle)

carRoutes.post(
	"/images/:id",
	ensureAuthenticated,
	ensureAdmin,
	upload.array("images"),
	uploadCarImagesController.handle);

export { carRoutes }