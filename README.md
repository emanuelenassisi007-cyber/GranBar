# Responsive Website for a Local Bar
A modern and responsive website developed for a local bar as a real-world project
The website was designed to provide customers with essential information about the bussiness and to offer a simple and intuitive contact system.

## Features
- Responsive design
- Modern and clean user interface
- Contact form
- custom Node.js backend
- Automatic email sending
- Custom thank-you page after form submission.
- Secure environment variables using '.env'

## Technologies
### Frontend
- HTML5
- CSS3
- JavaScript
### Backend
- Node.js
- Express.js
- Nodemailer

## Project Structure
```
/
    public/
      index.html
      css/
      js/
      images/
    server.js
    package.json
    .gitignore
    README.md
```
## Installation
Clone the repository
```bash 
git clone https://github.com/emanuelenassisi007-cyber/GranBar.git
```
Install dependencies
```bash 
npm install
 ```
Create a '.env' file
```env
EMAIL_USER = your_email
EMAIL_PASS = your_password
```
Run the project
```bash
npm start
```
Open
```
http://localhost:3000
```
## Contact Form
The contact form is managed through a custom Node.js backend using Express and Nodemailer.
Unlike third-party services, the backend redirects users to a custom thank-you page, providing a more professional user experience and allowing future backend extensions.
## Future Improvements
- Online menu
- Reservation system
- Gallery section
- Google Maps integration
- Performance optimazion
- SEO improvements

## Author
Developed by **Emanuele Nassisi**
