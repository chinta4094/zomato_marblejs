import mongoose from "mongoose";
import itemSchema from "../../schemas/itemSchema";
import userSchema from "../../schemas/userSchema";
import { pipe } from "fp-ts/lib/function";
import { useTestBedSetup } from "../test.setup";

describe("Zomato TestCase", () => {
	const testBedSetup = useTestBedSetup();

	beforeAll(async () => {
		mongoose.connect("mongodb://localhost:27017/Marblejs_Test", (err) => {
			if (err) {
				return err;
			} else {
				return "CONNECTED";
			}
		});
		await mongoose.connection.dropCollection("userdetails");
		await mongoose.connection.dropCollection("tokendetails");
		await mongoose.connection.dropCollection("itemdetails");
		await mongoose.connection.dropCollection("cartdetails");
		await mongoose.connection.dropCollection("promodetails");
		await mongoose.connection.dropCollection("promocartdetails");
	});

	// afterAll( async () => {
	//     await mongoose.connection.dropCollection('userdetails')
	//     await mongoose.connection.dropCollection('tokendetails')
	// })

	it("Sample TestCase", () => {
		expect(1 + 2).toBe(3);
	});

	it("POST /api/v1/admin/item/createItem admin create Item name Idly", async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/admin/item/createItem"),
			request.withBody({
				name: "Idly",
				cost: 40,
			}),
			request.send,
		);
		expect(response.body.status).toBe(200);
	});

	it("POST /api/v1/admin/item/createItem admin create Item name Bajji", async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/admin/item/createItem"),
			request.withBody({
				name: "Bajji",
				cost: 40,
			}),
			request.send,
		);
		expect(response.body.status).toBe(200);
	});

  it("POST /api/v1/admin/item/createItem admin create Item name Dosa", async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/admin/item/createItem"),
			request.withBody({
				name: "Dosa",
				cost: 40,
			}),
			request.send,
		);
		expect(response.body.status).toBe(200);
	});

  it("POST /api/v1/admin/item/createItem admin create Item name Chapati", async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/admin/item/createItem"),
			request.withBody({
				name: "Chapati",
				cost: 40,
			}),
			request.send,
		);
		expect(response.body.status).toBe(200);
	});

  it('POST "/api/v1/admin/promo" create "ASDF123M" promocode for discount', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/admin/promo"),
      request.withBody({
        promoCode : 'ASDF123M',
        startDate : '2022/03/29',
        endDate : '2022/04/5',
        discount : 10
      }),
			request.send,
		);
		expect(response.body.status).toEqual(200);
	});

  it('POST "/api/v1/admin/promo" create "MLPO11KA" promocode for discount', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/admin/promo"),
      request.withBody({
        promoCode : 'MLPO11KA',
        startDate : '2022/04/1',
        endDate : '2022/04/9',
        discount : 15
      }),
			request.send,
		);
		expect(response.body.status).toEqual(200);
	});

  it('POST "/api/v1/admin/promo" create "MNB99OOZ" promocode for discount', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/admin/promo"),
      request.withBody({
        promoCode : 'MNB99OOZ',
        startDate : '2022/03/22',
        endDate : '2022/03/29',
        discount : 18
      }),
			request.send,
		);
		expect(response.body.status).toEqual(200);
	});

	it('POST "/api/v1/user" create new user', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user"),
			request.withBody({
				firstName: "Bhaskar",
				lastName: "Chinta",
				userName: "Bhaskar4094",
				email: "bhaskarchinta4094@gmail.com",
				password: "Bhaskar18",
			}),
			request.send,
		);
		expect(response.body.status).toEqual(200);
	});

	it('POST "/api/v1/user" create user with same userName', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user"),
			request.withBody({
				firstName: "Bhaskar",
				lastName: "Chinta",
				userName: "Bhaskar4094",
				email: "bhaskarchinta4094@gmail.com",
				password: "Bhaskar18",
			}),
			request.send,
		);
		expect(response.body.status).toEqual(400);
	});

	it('POST "/api/v1/user/login" Should login with userName and Password', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user/login"),
			request.withBody({
				userName: "Bhaskar4094",
				password: "Bhaskar18",
			}),
			request.send,
		);
		expect(response.body.status).toEqual(200);
	});

	it('POST "/api/v1/user/login" Login with wrong userName', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user/login"),
			request.withBody({
				userName: "Bhaskar4099",
				password: "Bhaskar18",
			}),
			request.send,
		);
		expect(response.body.status).toEqual(400);
	});

	it('POST "/api/v1/user/login" Login with wrong password', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user/login"),
			request.withBody({
				userName: "Bhaskar4094",
				password: "Bhaskar1",
			}),
			request.send,
		);
		expect(response.body.status).toEqual(400);
	});

	it('POST "/api/v1/user/cart/add/:item" add idly to cart with 1 quantity', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user/cart/add/Idly"),
			request.send,
		);
		expect(response.body.status).toEqual(200);
	});

	it('POST "/api/v1/user/cart/add/:item" add idly to cart with 2 quantities', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user/cart/add/Idly"),
			request.send,
		);
		expect(response.body.quantity).toEqual(2);
	});

	it('POST "/api/v1/user/cart/add/:item" add Bajji to cart with 1 quantity', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user/cart/add/Bajji"),
			request.send,
		);
		expect(response.body.quantity).toEqual(1);
	});

  it('POST "/api/v1/user/promo/addPromo/:promoCode" add Promo to cart for discount', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user/promo/addPromo/ASDF123M"),
			request.send,
		);
		expect(response.body.status).toEqual(200);
	});

  it('POST "/api/v1/user/promo/addPromo/:promoCode" should not add Promo twice', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user/promo/addPromo/ASDF123M"),
			request.send,
		);
		expect(response.body.status).toEqual(400);
	});

  it('POST "/api/v1/user/promo/addPromo/:promoCode" should not add Promocode which is expired', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user/promo/addPromo/MNB99OOZ"),
			request.send,
		);
		expect(response.body.status).toEqual(400);
	});

  it('POST "/api/v1/user/promo/addPromo/:promoCode" should not add Promocode which is not yet started', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("POST"),
			request.withPath("/api/v1/user/promo/addPromo/MLPO11KA"),
			request.send,
		);
		expect(response.body.status).toEqual(400);
	});

  it('POST "/api/v1/user/cart" should get full cart details', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("GET"),
			request.withPath("/api/v1/user/cart"),
			request.send,
		);
		expect(response.body.status).toEqual(200);
	});

  it('POST "/api/v1/user/cart" should remove promocode from cart', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("DELETE"),
			request.withPath("/api/v1/user/promo/removePromo/ASDF123M"),
			request.send,
		);
		expect(response.body.status).toEqual(200);
	});

  it('POST "/api/v1/user/cart" should not get full cart details with adding promocode', async () => {
		const { request } = await testBedSetup.useTestBed();
		const response = await pipe(
			request("GET"),
			request.withPath("/api/v1/user/cart"),
			request.send,
		);
    console.log(response)
		expect(response.body.status).toEqual(400);
	});
  

});
