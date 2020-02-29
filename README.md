# API Contract

# MODEL
## User:
- id: Integer
- name: String(40)
- email: String(60)
- password: String(100)
- hp: String(15)
- ktp: String(16)
- image: Integer

## History:
- id: Integer
- id_user: Integer
- id_sekolah: Integer
- nominal: Integer
- metode: String(20)
- penyumbang: String(100)

## Historyvol (History Volunteer):
- id: Integer
- id_user: Integer
- id_sekolah: Integer

## Sekolahuang (Membuka Donasi):
- id: Integer
- sekolah: String(100)
- butuh: Integer //Jumlah yang dibutuhkan
- terkumpul: Integer ///Jumlah yang terkumpul
- image: String(50) //Letak image
- deskripsi: String (255)

## Sekolahvol (Membuka Donasi Volunteer):
- id: Integer
- sekolah: String(150)
- lokasi: String(130)
- jumlah: Integer
- deskripsi: String
- image: String(255)
- terkumpul: Integer

## Volun
- id_sekolah: Integer
- nama: String(50)
- ttl: String(40)
- pekerjaan: String(70)
- image: String(200)

# ENDPOINT
## User (/user)

### Register (POST /register)
***Request (body): JSON***

    "name"    : "Jagad"
    "email"   : "tesemail1@yahoo.com"
    "password": 123 
    "confirm" : 123 //Harus sama kayak password
    "nohp"    : 0812941122222
    "noktp"   : 102324134131414
    "myFile:  : (upload image)
    

***Response: JSON***

    200:
      {
          "success" : true
          "message" : "Akun terdaftar"
      }
   
    409:
      {
          "success" : false
          "message" : "email already registered / password information incorrect"
      }
   
    500:
      {
          "success" : false
          "message" : "internal server error"
      }
 
 ### Login User (POST /login)
    
 ***Request (body): JSON***
  
    "email"   : "tesemail1@yahoo.com"
    "password": "123"
   

***Response: JSON***

    200:
      {
          "success" : true
          "message" : "Token"
      }
      
    403:
      {
          "success" : false
          "message" : "Belum terdaftar"
      }
   
    409:
      {
          "success" : false
          "message" : "Password salah"
      }
   
    500:
      {
          "success" : false
          "message" : "internal server error"
      }
      

## Donasi (/donasi)
### Bikin Donasi Baru (POST /sekoldon)
***Request (body): JSON*** 
    
    "sekolah"   :   String
    "butuh"     :   Integer
    "deskripsi" :   String
    "image"     :   boolean
    jangan lupa bikin kolom upload
    
    
  



