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

### POST /trivia

> Add open trivia that user likes to its page!

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
    "category": <category from Open Trivia API>,
    "correct_answer": <correct_answer from Open Trivia API>,
    "difficulty": <difficulty from Open Trivia API>,
    "question": <question from Open Trivia API>,
    UserId: <from user id that has been login>,
}
```

_Response (201 - Created)_

```
{
    "id": 4,
    "category": "Entertainment: Music",
    "correct_answer": "The Wall",
    "difficulty": "medium",
    "question": "Which one of these Pink Floyd albums were also a movie?",
    "UserId": 1,
    "updatedAt": "2021-08-26T21:39:00.115Z",
    "createdAt": "2021-08-26T21:39:00.115Z"
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Category can not be empty",
        "Correct answer can not be empty",
        "Difficulty can not be empty",
        "Question can not be empty"
    ]
}
```

---

### GET /trivia/Mytrivia

> Get all saved trivia by User

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
    not needed
}
```

_Response (200)_

```
[
    {
        "id": 1,
        "category": "Entertainment: Music",
        "correct_answer": "Sunset Strip",
        "difficulty": "medium",
        "question": "Which of these is not a single by Pink Floyd guitarist, David Gilmour?",
        "UserId": 1,
        "createdAt": "2021-08-26T20:41:26.731Z",
        "updatedAt": "2021-08-26T20:41:26.731Z",
        "User": {
            "id": 1,
            "nickname": "test1"
        }
    }
]
```

_Response (401 - Unauthorized)_

```
{
    "message": "Please login first!"
}
```

---

### DELETE /trivia/:id

> Get all saved trivia by User

_Request Params_

```
Required:
id = [integer]
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
    not needed
}
```

_Response (200)_

```
{
    "message": "Trivia has been successfully deleted"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "Please login first!"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "Forbidden Error"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Not Found"
}
```

---

---
