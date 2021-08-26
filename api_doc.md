# Trivia.io Server

Trivia.io App is an application to play trivia quiz with your friends in real time and manage to chat with each others. This app has:

- RESTful endpoint for user log
- JSON formatted response

&nbsp;

## RESTful endpoints

### POST /register

> Create new user

_Request Params_

```
{
    not needed
}
```

_Request Header_

```
{
  not needed
}
```

_Request Body_

```
{
    "nickname": "<username to get insert into>",
    "email": "<email to get insert into>",
    "password": "<password to get insert into>",
}
```

_Response (201)_

```
{
    "id": 3,
    "nickname": "tubagus",
    "points": 0
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Nickname is required",
        "Email is required",
        "This field should be an e-mail input",
        "Password is required",
        "Password should be more than 5 characters"
    ]
}
```

---

### POST /login

> Login user

_Request Params_

```
{
    not needed
}
```

_Request Header_

```
{
  not needed
}
```

_Request Body_

```
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>",
}
```

_Response (200)_

```
{
    "access_token": "<your access token>"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "Wrong Input For Your Email/Password"
}
```

---

### GET /info

> To get user info

_Request Params_

```
{
    not needed
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
    "id": 3,
    "nickname": "tubagus",
    "points": 0
}
```

---

---
