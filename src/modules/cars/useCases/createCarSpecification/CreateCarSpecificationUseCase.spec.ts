import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarsSpecificationUseCase } from "./CreateCarSpecificationUseCase";


let createCarsSpecificationUseCase: CreateCarsSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {

	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
		createCarsSpecificationUseCase = new CreateCarsSpecificationUseCase(
			carsRepositoryInMemory,
			specificationsRepositoryInMemory
		);
	})

	it("should not be able to add a new specification to a non-existent car", async () => {
		expect(async () => {
			const car_id = "1234";
			const specifications_id = ["54321"];
			await createCarsSpecificationUseCase.execute({ car_id, specifications_id });
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should be able to add a new specification to the car", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Name Car",
			description: "Description Car",
			daily_rate: 100,
			license_plate: "ABC-123",
			fine_amount: 60,
			brand: "Brand Car",
			category_id: "category"
		});

		const specification = await specificationsRepositoryInMemory.create({
			description: "test",
			name: "test"
		});

		const specifications_id = [specification.id];

		const specificationsCars = await createCarsSpecificationUseCase.execute({
				car_id: car.id,
				specifications_id
			});

			expect(specificationsCars).toHaveProperty("specifications");
			expect(specificationsCars.specifications.length).toBe(1);

	});

});