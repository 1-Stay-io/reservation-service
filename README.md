# Ailpup - Frontend
#### Frontend Developer: Chris Diep

Reservations component for a vacation rental marketplace site
<div align="center">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/WholeSite.png" height="450">
</div>
<div align="center">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/CalendarComponent.png" height="275">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/FeesComponent.png" height="275">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/GuestsComponent.png" height="275">
</div>

## Related Projects

  - https://github.com/spicy-boiz/photo-carousel-service
  - https://github.com/spicy-boiz/places-to-stay-service
  - https://github.com/spicy-boiz/reviews-service

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API Documentation](#api-documentation)

## Usage

- Access the individual component through http://18.217.62.125:3002/listings/5/
- Access the site in whole through http://3.20.233.115:3000/5/
- Change listings by modifying the numerical value after the site, e.g. from http://3.20.233.115:3000/5/ to http://3.20.233.115:3000/10/

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
npm run seed
npm run server
npm run build
```

# Stay.io - Backend
#### Backend Developer: Victor Wong

## API Documentation

### Create:
#### Making a reservation
  * POST `/listings/:listingId/reservation/`

**Success Status Code:** `201`

**Request Body:** Expects JSON with the following keys.

```json
    {
      "listingId": "Number",
      "userId": "Number",
      "checkInDate": "Date",
      "checkOutDate": "Date",
      "guests": {
        "adults": "Number",
        "children": "Number",
        "infants": "Number",
      },
      "cost": "Number",
    }
```

#### Creating a new listing
  * POST `/listings/`

**Success Status Code:** `201`

**Request Body:** Expects JSON with the following keys.

```json
    {
      "userId": "Number",
      "name": "String",
      "maxGuests": "Number",
      "maxStay": "Number",
      "fees": {
        "perNight": "Number",
        "cleaning": "Number",
        "service": "Number",
      },
    }
```

### Read:
#### Get reservation details for listing
  * GET `/listings/:listingId/reservations/`

**Path Parameters:**
  * `listingId` listing id

**Success Status Code:** `200`

**Returns:** JSON

```json
    [ {
      "id": "Number",
      "listingId": "Number",
      "userId": "Number",
      "checkInDate": "Date",
      "checkOutDate": "Date",
      "guests": {
        "adults": "Number",
        "children": "Number",
        "infants": "Number",
      },
      "cost": "Number",
    }, ... ]
```

#### Get inforation details for listing
  * GET `/listings/:listingId/`

**Path Parameters:**
  * `listingId` listing id

**Success Status Code:** `200`

**Returns:** JSON

```json
  {
    "listingId": "Number",
    "userId": "Number",
    "name": "String",
    "maxGuests": "Number",
    "maxStay": "Number",
    "fees": {
      "perNight": "Number",
      "cleaning": "Number",
      "service": "Number",
    },
  }
```

### Update:

#### Update a listing
  * PATCH `/listings/:listingId/`

**Path Parameters:**
  * `listingId` listing id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
  {
    "listingId": "Number",
    "userId": "Number",
    "name": "String",
    "maxGuests": "Number",
    "maxStay": "Number",
    "fees": {
      "perNight": "Number",
      "cleaning": "Number",
      "service": "Number",
    },
  }
```

### Delete:

#### Delete a reservation
  * DELETE `/reservation/:id`

**Path Parameters:**
  * `id` reservation id

**Success Status Code:** `204`

#### Delete a listing
  * DELETE `/listing/:listingId`

**Path Parameters:**
  * `listingId` listing id

**Success Status Code:** `204`
