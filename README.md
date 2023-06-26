# Digital cow hut backend

digital cow hut is a online cow selling platform where a seller can sell his cow and earn mony and a buyer can buy his expected cow.

#### Technology Stack

- Typescript as the programming language.
- Express.js as the web framework
- Mongoose as the Object Data Modeling (ODM) and validation library for MongoDB
- vercel for deployment

## Documentation

#### Database Model

- Users [as a seller or as a buyer]
- Cows
- Orders

#### Sample Data: (User as Buyer)

```
{
"_id": "64983278124f675644056831",
"role": "buyer",
"password": "abrakadabra",
"name": {
"firstName": "Md",
"lastName": "Yeakub",
"_id": "64983278124f675644056832",
"id": "64983278124f675644056832"
},
"phoneNumber": "01882948594",
"address": "Noakhali",
"budget": 50000,
"income": 0,
"createdAt": "2023-06-25T12:26:32.255Z",
"updatedAt": "2023-06-25T12:26:32.255Z",
"__v": 0,
"id": "64983278124f675644056831"
}
```

#### Sample Data: (User as seller)

```
{
"_id": "649832aa124f675644056834",
"role": "seller",
"password": "abrakadabra",
"name": {
"firstName": "Md",
"lastName": "Jabed",
"_id": "649832aa124f675644056835",
"id": "649832aa124f675644056835"
},
"phoneNumber": "01819486949",
"address": "Noakhali",
"budget": 0,
"income": 40000,
"createdAt": "2023-06-25T12:27:22.755Z",
"updatedAt": "2023-06-25T12:48:03.238Z",
"__v": 0,
"id": "649832aa124f675644056834"
}
```

#### Sample Data: cow

```
{
"_id": "649833f5124f675644056847",
"name": "kala chan",
"age": "4",
"price": 10000,
"location": "Chattogram",
"breed": "Brahman",
"weight": 400,
"label": "Sold out",
"category": "Beef",
"seller": {},
"createdAt": "2023-06-25T12:32:53.368Z",
"updatedAt": "2023-06-25T12:48:04.127Z",
"__v": 0,
"id": "649833f5124f675644056847"
},
```

#### Sample Data: order

```
{
"_id": "649837847c8af63e6f0f5073",
"cow": "649833f5124f675644056847",
"buyer": "649832f3124f675644056837",
"createdAt": "2023-06-25T12:48:04.436Z",
"updatedAt": "2023-06-25T12:48:04.436Z",
"__v": 0,
"id": "649837847c8af63e6f0f5073"
}
```

### Api End points

#### Live link: https://digital-goru-bazar-mdyeakub1.vercel.app/

#### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/6498331b124f67564405683a (GET)
- api/v1/users/6498331b124f67564405683a (PATCH)
- api/v1/users/6498331b124f67564405683a (DELETE)

#### User

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/6498340a124f675644056849 (GET)
- api/v1/cows/6498340a124f675644056849 (PATCH)
- api/v1/cows/6498340a124f675644056849 (DELETE)

### Pagination and Filtering routes of Cows

- api/v1/cows?page=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha

### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)
