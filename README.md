# API Contract

# MODEL
## User:
- id: Integer
- name: String(40)
- email: String(60)
- password: String(100)
- hp: String(15)
- ktp: String(16)
- verif: Integer


## History:
- id: Integer
- id_user: Integer
- id_sekolah: Integer
- nominal: Integer
- metode: String(20)
- penyumbang: String(100)

# ENDPOINT
## User (/user)

### Register (POST /register)
***Request (body): JSON***

    "name"    : "Jagad"
    "email"   : "tesemail1@yahoo.com"
    "password": "123" 
    "confirm" : "123" //Harus sama kayak password
    

***Response: JSON***

  200:
      {
          "success" : true,
          "message" : "Akun terdaftar"
      }
   
   409:
      {
          "success" : false,
          "message" : "email already registered / password information incorrect"
      }
   
   500:
      {
          "success": false,
          "message": "internal server error"
      }
 
 ### Login User (POST /login)
    
 ***Request (body): JSON***
  
    "email"   : "tesemail1@yahoo.com"
    "password": "123"
   

***Response: JSON***

  200:
      {
          "success" : true,
          "message" : "Token"
      }
      
   403:
      {
          "success" : false,
          "message" : "Belum terdaftar"
      }
   
   409:
      {
          "success" : false,
          "message" : "Password salah"
      }
   
   500:
      {
          "success": false,
          "message": "internal server error"
      }
          
  



