# contact-manager-api

This is a guide for REST API Task by Addenda.

# Table of Contents
1. [Getting Started](#getting-started)

2. [Adding the **.env** file](#.env-file)

3. [Running the Tests](#tests)

4. [Users](#users)

    - [Registering a User](#register)

    - [Login a User](#login)

5. [Contacts](#contacts)

    - [Adding a Contact](#add-contact)

    - [Getting all Contacts](#get-contacts)
    - [Pagination](#pagination)
    - [Get a Contact](#get-contact)

    - [Editing a Contact](#edit-contact)

    - [Deleting a Contact](#delete-contact)
    
6. [Helpful Links](#helpful-links)



## Getting Started<a name="getting-started"/>

Clone the repository to your local machine and the open **command prompt/terminal** in the root folder of this project.

```
git clone https://github.com/achowba/contact-manager-api.git
```

## Adding the **.env** file<a name=".env-file"/>

The **.env** file contains the list of the environment variables used in this project. You can create yours and add the value of the environment variables as shown in the image below:

![.env file](https://res.cloudinary.com/achowba/image/upload/v1578864533/addenda-task/env_file.png)

## Running the Tests<a name="tests"/>

To run the tests for this project, type the code below in the terminal (which is pointed at the root folder of this project).

```npm
npm run test
```



## Users<a name="users"/>

This is the endpoint for all operations regarding the users.

```
/api/v1/users
```

List of supported methods

- POST

### Registering a User<a name="register"/>

<u>Endpoint</u>

```javascript
POST /api/v1/users/register
```

<u>Request Body</u>

```json
{
	"username": "ironman",
    "email": "stark@avenger.com"
	"password": "iamironman"
}
```





### Login a User<a name="login"/>

<u>Endpoint</u>

```javascript
POST /api/v1/users/login
```

<u>Request Body</u>

```json
{
    "email": "stark@avenger.com"
	"password": "iamironman"
}
```





## Contacts<a name="contacts"/>

#### Adding a Contact<a name="add-contact"/>

<u>Endpoint</u>

```javascript
POST /api/v1/contacts/add
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
GET /api/v1/contacts
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
    "email": "newEmail",
}
```



#### Deleting a Contact<a name="delete-contact"/>

<u>Endpoint</u>

```javascript
DELETE /api/v1/contacts/delete/:contactId
```



## Helpful Links<a name="helpful-links"/>

- [Getting started with Postman](#https://youtu.be/t5n07Ybz7yI)
- [How to upload file via Postman](#https://youtu.be/c07IsbSNqfI)