# chunked-upload  
Split a file into chunks and upload(ajax) to server

## Environment
Windows 7 (64bit)   
PHP 7.1 (VC14 x64 Thread Safe, http://windows.php.net/download/)   
Apache 2.4.25 Win64 (https://www.apachelounge.com/download/)   

### Pros  
1. Overcome POST max size  
2. Overcome Upload max filesize  

### Cons  
1. Massive requests as uploading large file (e.g., nGB+)  
2. Time-consuming as merging chunk files  