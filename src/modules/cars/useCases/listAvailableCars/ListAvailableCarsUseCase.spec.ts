import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
	});

	it("should be able to list all available cars", async () => {

		const car = await carsRepositoryInMemory.create({
			name: "Car1",
			description: "Car description",
			daily_rate: 140,
			license_plate: "ABC-1375",
			fine_amount: 40,
			brand: "Car Brand",
			category_id: "categoryid"
		});

		const cars = await listAvailableCarsUseCase.execute({});

		expect(cars).toEqual([car]);
	});

	it("should be able to list all available cars by brand", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car2",
			description: "Car description",
			daily_rate: 140,
			license_plate: "ABC-1375",
			fine_amount: 40,
			brand: "Car Brand teste",
			category_id: "categoryid"
		});

		const cars = await listAvailableCarsUseCase.execute({
			brand: "Car Brand teste",
		});

	

		expect(cars).toEqual([car]);
	});

	it("should be able to list all available cars by name", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car3",
			description: "Car description",
			daily_rate: 140,
			license_plate: "ABC-1235",
			fine_amount: 40,
			brand: "Car Brand teste",
			category_id: "categoryid"
		});

		const cars = await listAvailableCarsUseCase.execute({
			name: "Car3",
		});

	

		expect(cars).toEqual([car]);
	});

	it("should be able to list all available cars by category", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car3",
			description: "Car description",
			daily_rate: 140,
			license_plate: "ABC-1235",
			fine_amount: 40,
			brand: "Car Brand teste",
			category_id: "12345"
		});

		const cars = await listAvailableCarsUseCase.execute({
			category_id: "12345",
		});

	

		expect(cars).toEqual([car]);
	});
});

