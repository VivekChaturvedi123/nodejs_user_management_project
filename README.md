# nodejs_user_management_project



project setup:- 
npm init 
npm install express mongoose body-parser jsonwebtoken bcrypt



api testing :- 

users endpoints:- 

1. post request endpoint: - http://localhost:4000/users/register

json:- 
{
        "userName": "vivek_user",
        "password": "Vivek123@",
        "userEmail": "vivek_user@gmail.com"
}

response:-
{
    "status": "success",
    "message": "User Created Successfully"
}




2. post request endpoint: - http://localhost:4000/users/authenticate

json:- 
{
        "userEmail": "vivek_user@gmail.com",
         "password": "Vivek123@"
}


response:-
{
    "status": "success",
    "currentUser": "0PbaWFmmrgzfrfnIU2FsdGVkX18KJtPd1ZLOz5nwwyrLIA+j1hcYV6tW+bvGKff2X0XAkCpm3Gfzv6LmAyAkTNrMzIehPlvNoQlxI6QBSQwS7ZQB/dh7hsI/KRnuRobw+VlKDgLfDDQdVcmgj03I8JkDaDDoA/mv1IqyKjT0eEETj4j1UMkOyNvBEmCp/CufFoj4W7fxBXAdQ7sl8Fgi+U823to+q3r/EyLH8trhE2OmcqowMjGduAaEJSTadlJPZqqUNGf/ctLobnJOPNvK3YhBXhWEvfdsnfBiHnlXZbHzip6CAEWPgn5rb0KkkE4LJBYckeDUx2iNDsXBMLEUkIN+f83vvxqbkZMEev7wDe/InhnC9t67RJSAtTvL69E6P/G+epFUf9eNjb2bS6LxwhxhAz+ZTU+sPsPisQ=="
}


3. post request endpoint: - http://localhost:4000/users/profile

json:- 
{
        "userEmail": "vivek_user@gmail.com"
         
}


response:-
[
    {
        "_id": "670bff60d029127cf3ac8eab",
        "userName": "vivek_user",
        "password": "4fe1eeb8ad2bd76ecd2b0e998d1450be",
        "userEmail": "vivek_user@gmail.com",
        "registrationDate": "13-10-2024"
    }
]



admin endpoints :- 


4. post request endpoint: - http://localhost:4000/admin/create_admin

json:- 
{
      "name":"admin_vivek",
      "email":"admin_vivek@gmail.com",
      "password": "admin123@",
      "role":"admin"
}


response:-
{
    "status": "success",
    "message": "Admin created successfully",
    "userId": "670c05ba6ee333dceff1a457"
}



5. post request endpoint: - http://localhost:4000/admin/users

json:- 
{
      "userName":"sourabh",
      "userEmail":"sourabh@gmail.com",
      "password": "sourabh123@",
      "role":"user",
      "email":"admin_vivek@gmail.com"
}


response:-
{
    "status": "success",
    "message": "User created successfully",
    "userId": "670c0924cff28428e9c5aacb"
}




6. PUT request endpoint: - http://localhost:4000/admin/users/670c0924cff28428e9c5aacb

json:- 
{
      "userName":"sourabh_UPDATED",
      "userEmail":"sourabh@gmail.com",
      "role":"user",
      "email":"admin_vivek@gmail.com"
}


response:-
{
    "status": "success",
    "message": "User updated successfully"
}




7. DELETE request endpoint: - http://localhost:4000/admin/users/670c0924cff28428e9c5aacb

json:- 
{
      "_id":"670c0924cff28428e9c5aacb",
      "email":"admin@gmail.com"
}


response:-
{
    "status": "success",
    "message": "User deleted successfully"
}




8. GET request endpoint: - http://localhost:4000/admin/users

json:- 
{
"page": 1,
"limit": 10,
"userName": "sourabh",
"userEmail": "sourabh@gmail.com",
"role": "user",
"email":"admin@gmail.com"
}


response:-
{
    "users": [
        {
            "_id": "670bff60d029127cf3ac8eab",
            "userName": "vivek_user",
            "password": "4fe1eeb8ad2bd76ecd2b0e998d1450be",
            "userEmail": "vivek_user@gmail.com",
            "registrationDate": "13-10-2024"
        },
        {
            "_id": "670c05ba6ee333dceff1a457",
            "name": "admin_vivek",
            "email": "admin_vivek@gmail.com",
            "password": "bb42f735b23f3e889a0f2a702e62b4c9",
            "role": "admin",
            "registrationDate": "2024-10-13T17:39:06.663Z"
        },
        {
            "_id": "670c0c6420440597c68242b1",
            "userName": "sourabh",
            "userEmail": "sourabh@gmail.com",
            "password": "c8840334b4c656d141219c52a6a10bfa",
            "role": "user",
            "registrationDate": "2024-10-13T17:53:40.299Z"
        }
    ],
    "currentPage": 1,
    "totalPages": 1,
    "totalUsers": 3
}

9. services :- fetchRecentUsers 

response :- 
Server is running on port 4000
Users registered in the last 7 days: [
  {
    _id: new ObjectId("670bff60d029127cf3ac8eab"),
    userName: 'vivek_user',
    password: '4fe1eeb8ad2bd76ecd2b0e998d1450be',
    userEmail: 'vivek_user@gmail.com',
    registrationDate: 2024-10-12T17:39:06.663Z
  },
  {
    _id: new ObjectId("670c05ba6ee333dceff1a457"),
    name: 'admin_vivek',
    email: 'admin_vivek@gmail.com',
    password: 'bb42f735b23f3e889a0f2a702e62b4c9',
    role: 'admin',
    registrationDate: 2024-10-13T17:39:06.663Z
  },
  {
    _id: new ObjectId("670c0c6420440597c68242b1"),
    userName: 'sourabh',
    userEmail: 'sourabh@gmail.com',
    password: 'c8840334b4c656d141219c52a6a10bfa',
    role: 'user',
    registrationDate: 2024-10-13T17:53:40.299Z
  },
  {
    _id: new ObjectId("670c10d6e2f8736d5c242210"),
    userName: 'abhinav_user',
    userEmail: 'abhinav_user@gmail.com',
    password: '9578f8313f6a6da3067ff3f331d84807',
    registrationDate: 2024-10-13T18:26:30.643Z
  }
]
we're connected!
