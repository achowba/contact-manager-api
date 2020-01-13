# contact-manager-api

This is a guide for REST API Task by Addenda.

# Table of Contents

1. [Getting Started](#getting-started)

2. [Adding the **.env** file](#.env-file)

3. [Running the Tests](#tests)

4. [Running the Project](#run-project)

5. [Users](#users)

    - [Registering a User](#register)

    - [Login a User](#login)

6. [Contacts](#contacts)

    - [Adding a Contact](#add-contact)
        - [Uploading a contact's image](#upload-image)
    - [Getting all Contacts](#get-contacts)
        - [Pagination](#pagination)
    - [Get a Contact](#get-contact)

    - [Editing a Contact](#edit-contact)

    - [Deleting a Contact](#delete-contact)

7. [Helpful Links](#helpful-links)

## Getting Started<a name="getting-started"/>

Clone the repository to your local machine and the open **command prompt/terminal** in the root folder of this project.

```
git clone https://github.com/achowba/contact-manager-api.git
```

## Adding the **.env** file<a name=".env-file"/>

The **.env** file contains the list of the environment variables used in this project. If you have been given the **.env** file, add it to the root folder of the project. You can create yours and add the values of the environment variables as shown in the image below:

![.env file](https://res.cloudinary.com/achowba/image/upload/v1578864533/addenda-task/env_file.png)

## Running the Tests<a name="tests"/>

To run the tests for this project, type the code below in the terminal (which is pointed at the root folder of this project).

```npm
npm run test
```

## Running the Project<a name="run-project"/>

```
npm start
```

Running the above command in the terminal should start the project in port 3600

## Users<a name="users"/>

This is the endpoint for all operations regarding the users.

```
/api/v1/users
```

List of supported methods

-   POST

### Registering a User<a name="register"/>

<u>Endpoint</u>

```javascript
POST / api / v1 / users / register;
```

<u>Request Body</u>

```json
{
    "username": "ironman",
    "email": "stark@avenger.com",
    "password": "iamironman"
}
```

### Login a User<a name="login"/>

<u>Endpoint</u>

```javascript
POST / api / v1 / users / login;
```

<u>Request Body</u>

```json
{
    "email": "stark@avenger.com",
    "password": "iamironman"
}
```

After signing in a user, a token is returned in the response body which can now be used to make requests to the contacts endpoint.

## Contacts<a name="contacts"/>

Requests to the contacts routes are authenticated and a token is needed to allow users make requests to the contacts endpoint. The token is returned in the response body after the user logs in. This is how the token is used in the request header to make requests to the contacts endpoint.

```javascript
Key: Authorization
Value: Bearer {{YOUR_TOKEN_GOES_HERE}}
```

The [Helpful Links](#helpful-links) section contains resources on getting started with Postman.

#### Uploading a Contact's Image<a name="upload-image"/>

When adding a contact, a contact's image can be uploaded in place of the default image provided. This upload is done by sending the request as a multipart/form-data. The [Helpful Links](#helpful-links) section contains a link to making multipart/form-data requests via postman.

#### Adding a Contact<a name="add-contact"/>

<u>Endpoint</u>

```javascript
POST /api/v1/contacts/add;
```

Request Body

```json
{
    "firstName": "Steve",
    "lastName": "Rogers",
    "phoneNumber": "673287239",
    "email": "steve@avengers.com"
}
```

#### Getting all Contacts<a name="get-contacts"/>

<u>Endpoint</u>

```javascript
GET /api/v1/contacts;
```

#### Pagination<a name="pagination"/>

The [get all contacts](#get-contacts) route supports pagination and this is how it is used.

<u>URL Query parameters</u>

```javascript
limit = number of contacts to retrieve per page, default is 5
page = the page to get, default is 1
sortBy = the property of the contact by which the results can be sorted, default is "firstName"
```

<u>Usage</u>

```javascript
GET /api/v1/contacts?limit=5&sortBy=lastName&page=1
```

#### Get a Contact<a name="get-contact"/>

<u>Endpoint</u>

```javascript
GET /api/v1/contacts/:contactId
```

#### Editing a Contact<a name="edit-contact"/>

<u>Endpoint</u>

```javascript
PATCH /api/v1/contacts/edit/:contactId
```

<u>Request Body</u>

```json
{
    "phoneNumber": "newphoneNumber",
    "email": "newEmail"
}
```

#### Deleting a Contact<a name="delete-contact"/>

<u>Endpoint</u>

```javascript
DELETE /api/v1/contacts/delete/:contactId
```

## Helpful Links<a name="helpful-links"/>

-   [Getting started with Postman](#https://youtu.be/t5n07Ybz7yI)
-   [How to upload file via Postman](#https://youtu.be/c07IsbSNqfI)
-   [Using Postman for API Requests](#https://support.brightcove.com/use-postman-api-requests)
-   [Sending multipart/form-data requests via Postman](#https://www.youtube.com/watch?v=3vqvZmP28KE)
