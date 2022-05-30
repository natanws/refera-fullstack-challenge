# Refera - Fullstack Code Challenge

## Description

This application was made using React and Django.

In this application the user can create orders for maintenance of real estate, update orders, retrieve them and delete. The categories feature is accessible through the front end only to retrieve categories already added to the database.

There is no authentication layer in this project. But it could be created using authtoken from django's rest framework library. Here are the steps necessary:

- A model for users
- Password hashing service
- Register endpoint
- Utilize Django's authtoken to generate a token
- A middleware to verify if the user's token is valid or expired
- Login endpoint
- Protection for private endpoints

Currently there are two tables in the database, Orders and Categories. To create a structure to support storage of real estate agencies, companies and contacts it would be required to change the structure of all tables, except for Categories:

### Real estate agency
- Relation on this table to contacts
- Relation to orders created by the agency
- Ratings
### Company
- With a table of users, there would need to be a relation to users
- Assuming that companies would have one account only, storing hashed password and access information
- Ratings
### Contacts
- All the contacts data
### Orders
- Relation to orders accepted by companies
- Removing most data stored here and using pivot tables to make relations N-N
# How to run it

## Back end

From the project root, you should access the back end folder, create your virtual environment and initialize it. Then install all dependencies.

```
cd back-end                       <-- Access back end folder
python -m venv venv               <-- Create virtual environment
source venv/bin/activate          <-- Initialize the virtual environment
pip install -r requirements.txt   <-- Install dependencies
```

Then make your migrations, migrate them and run the server.

```
python manage.py makemigrations   <-- Create migrations
python manage.py migrate          <-- Migrate DB
python manage.py runserver        <-- Run server
```
## Front end

From the project root, access the front end folder and install all dependencies.

```
cd front-end                      <-- Access the front end folder
yarn                              <-- Install dependencies
yarn start                        <-- Start project
```

# API

### Base URL for hosting locally
http://localhost:8000/api

## Create Order 
### `POST - /orders`

Request example:

```json
{
  {
    "contact_name": "Marcos",
    "contact_phone": "51991006915",
    "real_estate_agency": "Imobiliaria Certeira",
    "order_description": "Necessito de um eletricista para problemas elétricos sendo apresentados nas tomadas do apartamento.",
    "company": "Empresa Trivial",
    "category": {
      "name": "Elétrica"
    },
    "deadline": "2022-05-03T00:00:00-05:00"
  }
}
```
Expected response:

`201 - CREATED`
```json
{
  "id": 1,
  "contact_name": "Marcos",
  "contact_phone": "51991006915",
  "real_estate_agency": "Imobiliaria Certeira",
  "order_description": "Necessito de um eletricista para problemas elétricos sendo apresentados nas tomadas do apartamento.",
  "company": "Empresa Trivial",
  "category": {
    "id": 1,
    "name": "Elétrica"
  },
  "deadline": "2022-05-03T00:00:00-05:00"
}
```

Possible errors:

`400 - BAD REQUEST`
```json
{
  "contact_name": [
    "This field is required."
  ],
  "contact_phone": [
    "This field is required."
  ],
  "real_estate_agency": [
    "This field is required."
  ],
  "order_description": [
    "This field is required."
  ],
  "company": [
    "This field is required."
  ],
  "deadline": [
    "This field is required."
  ],
  "category": [
    "This field is required."
  ]
}
```
```json
{
  "contact_name": [
    "Not a valid string."
  ]
}
```

## Get Orders
### `GET - /orders`

`no body`

Expected response:

`200 - OK`

```json
{
  "orders": [
    {
      "id": 1,
      "contact_name": "Marcos",
      "contact_phone": "51991006915",
      "real_estate_agency": "Imobiliaria Certeira",
      "order_description": "Necessito de um eletricista para problemas elétricos sendo apresentados nas tomadas do apartamento.",
      "company": "Empresa Trivial",
      "category": {
        "id": 1,
        "name": "Elétrica"
      },
      "deadline": "2022-05-03T00:00:00-05:00"
    }  
  ]
}
```
## Get Single Orders
### `GET - /orders/<id>`

`no body`

Expected response:

`200 - OK`

```json
{
  "order": {
    "id": 1,
    "contact_name": "Marcos",
    "contact_phone": "51991006915",
    "real_estate_agency": "Imobiliaria Certeira",
    "order_description": "Necessito de um eletricista para problemas elétricos sendo apresentados nas tomadas do apartamento.",
    "company": "Empresa Trivial",
    "category": {
      "id": 1,
      "name": "Elétrica"
    },
    "deadline": "2022-05-03T00:00:00-05:00"
  }  
}
```

## Patch Order

### `PATCH - /orders/<id>`

Request example:

```json
{
  "contact_name": "Fred"
}
```

Expected response:

`200 - OK`
```json
{
  "message": "Order updated",
  "order": {
    "id": 1,
    "contact_name": "Fred",
    "contact_phone": "51991006915",
    "real_estate_agency": "Imobiliaria Certeira",
    "order_description": "Necessito de um eletricista para problemas elétricos sendo apresentados nas tomadas do apartamento.",
    "company": "Empresa Trivial",
    "category": {
      "id": 1,
      "name": "Elétrica"
    },
    "deadline": "2022-05-03T00:00:00-05:00"
  }
}
```

## Delete Order

### `DELETE - /orders/<id>`

`no body`

Expected response:

`200 - OK`

```json
{
  "order": {
    "id": 1,
    "contact_name": "Fred",
    "contact_phone": "51991006915",
    "real_estate_agency": "Imobiliaria Certeira",
    "order_description": "Necessito de um eletricista para problemas elétricos sendo apresentados nas tomadas do apartamento.",
    "company": "Empresa Trivial",
    "category": {
      "id": 1,
      "name": "Elétrica"
    },
    "deadline": "2022-05-03T00:00:00-05:00"
  }  
}
```

## Create Category
### `POST - /categories`

Request example:

```json
{
  "name": "Hidráulica"
}
```

Expected resposne:

`201 - CREATED`

```json
{
  "id": 2,
  "name": "Hidráulica"
}
```
## Get Categories
### `GET - /categories`

`no body`

Expected resposne:

`200 - OK`

```json
{
  "categories": [
    {
      "id": 1,
      "name": "Elétrica"
    },
    {
      "id": 2,
      "name": "Hidráulica"
    }
  ]
}
```
## Get Single Categories
### `GET - /categories/<id>`

`no body`

Expected resposne:

`200 - OK`

```json
{
  "category": {
    "id": 2,
    "name": "Hidráulica"
  }
}
```

## Patch Category

### `PATCH - /categories/<id>`

Request example:

```json
{
	"name": "Infiltração"
}
```

Expected response:
`200 - OK`

```json
{
  "message": "Category updated",
  "category": {
    "name": "Infiltração"
  }
}
```

## Delete Category

### `DELETE - /categories/<id>`

`no body`

Expected response:

```json
{
  "message": "Category deleted",
  "category": {
    "id": null,
    "name": "Infiltração"
  }
}
```