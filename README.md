# MicroBlog

### Overview

This project is a social media web application built using HTML, CSS, Bootstrap, API, and JavaScript. The application allows users to register, log in, create posts, view posts, and interact with other users' profiles. It leverages API calls for data retrieval and user authentication.

## Table of Contents
- [Navigation](#navigation)
- [Registration and Login](#registration-and-login)
- [Home Page](#home-page)
- [Login Page](#login-page)
- [Registration Page](#registration-page)
- [Posts Page](#posts-page)
- [Profile Page](#profile-page)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Navigation

- The application features a consistent navigation bar and footer across all pages.
- Navigation includes links to Home, Login, Register, view-all, and user-specific profile pages.

## Registration and Login

- Users can register with the application to create an account.
- HTML validation ensures required fields are filled correctly.
- Upon registration, a token is generated for subsequent logins.

## Home Page

![Home page](/images/home.png)

- Contains a button that directs users to the Login page.
- Includes images and other content relevant to social media.

## Login Page

![Login page](/images/login.png)

- Allows users to log in using stored credentials.
- Utilizes API calls to authenticate users.
- Provides a link to the registration page for new users.

## Registration Page

![register page](/images/sign-up.png)

  - Similar to the Login page but used for new user registration.
  - Validates user input and sends data to the API for registration.
  - Generates a token upon successful registration for future logins.

## Posts Page

![Posts Page](/images/posts.png)

  - Displays posts created by other users, fetched via API.
  - Features a scroll-up button for easy navigation to the top of the page.
  - Includes a navigation bar with Home, Logout, and Profile links.
  - Each post has a link to the creator's profile page.

## Profile Page

![Other User](/images/profile-page.png)
![Owner Profile](/images/user-profile-page.png)
![Owner Profile Posts](/images/user-profile-posts.png)

  - Users can view their own profile with details like username, full name, and bio.
  - Clicking on the profile icon navigates users to their own profile page.
  - Visiting another user's profile page displays their username, full name, and bio.

## Technologies Used

- **Frontend:** HTML, CSS, Bootstrap, JavaScript
- **Backend:** API (for user authentication and data retrieval)

## Usage

1. Register or login to access the main features.
2. Navigate through Home, Posts, and Profile pages using the navigation bar.
3. Create posts from your profile page and view posts from other users.


