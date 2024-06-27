"use strict";

const urlParams = new URLSearchParams(location.search);
const profileContainer = document.querySelector("#profileContainer");
const logoutButton = document.querySelector("#logoutButton");
const profile = document.querySelector("#profileIcon");

const loginData = getLoginData();

const createPersonalPost = document.querySelector("#createPersonalPost");

const profileOptions = document.querySelector("#profileOptions");
const createPostTab = document.querySelector("#createPostTab");
const postsTab = document.querySelector("#postsTab");
const likesTab = document.querySelector("#likesTab");

window.onload = function () {

    getProfileData();
    logoutButton.onclick = logout;
    profile.onclick = profileIcon;

    profileShowTextField();

    createPostTab.onclick = showPersonalOptions;
    postsTab.onclick = showPersonalOptions;
    likesTab.onclick = showPersonalOptions;

}

// adding the icon (header) with functionality to go to personal profile
function profileIcon() {

    console.log("profileIcon() called");

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`
        },
    };
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", options)
        .then((response) => response.json())
        .then((userIcon) => {

            // Link to the profile page
            window.location.href = "../microblog/profile.html?id=" + loginData.username;

        })

    console.log(loginData.username);

}

// ========================== PERSONAL PROFILE =========================

// If user is in personal profile, show the text field to create a post
function profileShowTextField() {

    const existingCard = document.querySelector("#createPostCard");
    if(existingCard){
        return;
    }
    
    let id = '';

    if (urlParams.has("id") === true) {
        id = urlParams.get("id");
        if (id == loginData.username) {

            console.log("Personal user Profile: " + loginData.username);

            fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/" + id,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${loginData.token}`
                    },
                },
            )
                .then(response => response.json())
                .then(user => {

                    // create a card for the post creation
                    let card = document.createElement('div');
                    card.id = "createPostCard"
                    card.classList.add("card");
                    card.style.backgroundColor = "#209dc9";
                    createPersonalPost.appendChild(card);

                    // create body for the text fields
                    let cardBody = document.createElement('div');
                    cardBody.classList.add("card-body");
                    card.appendChild(cardBody);

                    // Create a title for the Card
                    let cardTitle = document.createElement('h4');
                    cardTitle.classList.add("card-title");
                    cardTitle.classList.add("my-3");
                    cardTitle.innerText = "What's on your mind?";
                    cardBody.appendChild(cardTitle);

                    // create text area for the card body
                    let cardText = document.createElement("textarea");
                    cardText.classList.add("card-text");
                    cardText.classList.add("fs-4");
                    cardText.classList.add("form-control");
                    cardText.classList.add("my-5");
                    cardText.required = true;
                    cardText.rows = 5;
                    cardBody.appendChild(cardText);

                    // create div for button
                    let buttonDiv = document.createElement("div");
                    buttonDiv.classList.add("text-center");
                    cardBody.appendChild(buttonDiv);
                    
                    // create submit button to post
                    let submitButton = document.createElement("button");
                    submitButton.classList.add("btn");
                    submitButton.classList.add("btn-outline-dark");
                    submitButton.classList.add("my-3");
                    submitButton.classList.add("fs-3");
                    submitButton.innerText = "Create Post";
                    buttonDiv.appendChild(submitButton);
                    
                    submitButton.addEventListener("click", (event) => {
                        event.preventDefault();
                        sendPostData(cardText.value);
                    });
                });
        }

        

    }

}


// Enter text and click submit to create a post
function sendPostData(message) {
    
    if (message != ""){
        console.log(`Text sent: ${message}`);

        // send request to post message
        let bodyData = {
            "text": `${message}`
        }
        
        fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loginData.token}`
                },
                body: JSON.stringify(bodyData),
            })
            .then(response => response.json())
            .then(data => {
                window.location.assign("../posts/posts.html")
            })
        
    }
    else{
        alert("A value must be provided in the Text field");
    }
    
}


function showPersonalPosts() {

    console.log("showing personal posts...");
    
}

function showPersonalLikes() {

    console.log("showing personal likes...");
    
}

// PERSONAL PROFILE OPTIONS (create post, show personal posts, show likes)
function showPersonalOptions(event) {

    event.preventDefault();

    let id = '';

    if (urlParams.has("id") === true) {
        id = urlParams.get("id");
        if (id == loginData.username) {

            console.log("Personal user Profile: " + loginData.username);

            fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/" + id,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${loginData.token}`
                    },
                },
            )
                .then(response => response.json())
                .then(user => {

                    // if the user clicks on the create post tab, show the text field
                    if (event.target === createPostTab){
                        profileShowTextField();
                    }
                    else if (event.target === postsTab){
                        showPersonalPosts();
                    }
                    else if (event.target === likesTab){
                        showPersonalLikes();
                    }
                });
        }

    }
}

// ========================= SHOW OTHER USERS PROFILES ==========================

function getProfileData() {

    let id = '';

    if (urlParams.has("id") === true) {
        id = urlParams.get("id");

        console.log("id: " + id);

        fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/" + id,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${loginData.token}`
                },
            },
        )
            .then(response => response.json())
            .then(user => {

                // create a card for the profile 
                let cardContainer = document.createElement("div");
                cardContainer.classList.add("card");
                cardContainer.classList.add("my-5");
                cardContainer.classList.add("py-4");
                profileContainer.appendChild(cardContainer);

                // create a div for row (img)
                let rowContainer = document.createElement("div");
                rowContainer.classList.add("row");
                rowContainer.classList.add("g-0");
                cardContainer.appendChild(rowContainer);

                // create a div for column (img)
                let columnContainer = document.createElement("div");
                columnContainer.classList.add("col-md-4");
                rowContainer.appendChild(columnContainer);

                // create a img element for the profile img
                let imgContainer = document.createElement("img");
                imgContainer.classList.add("img-fluid");
                imgContainer.classList.add("rounded-start");
                imgContainer.src = "../images/profile.png"
                imgContainer.alt = "profileImage";
                columnContainer.appendChild(imgContainer);

                // show the username under the image
                let displayUsername = document.createElement("h2");
                displayUsername.classList.add("text-primary");
                displayUsername.classList.add("text-center");
                displayUsername.innerText = `@${user.username}`;
                columnContainer.appendChild(displayUsername);

                // create second column container
                let textColumn = document.createElement("div");
                textColumn.classList.add("col-md-8");
                rowContainer.appendChild(textColumn);

                // create the body for the card
                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                textColumn.appendChild(cardBody);

                // create the card title (display name)
                let cardTitle = document.createElement("h1");
                cardTitle.classList.add("card-title");
                cardTitle.classList.add("my-4");
                cardTitle.classList.add("text-center");
                cardTitle.innerText = `${user.fullName}`
                cardBody.appendChild(cardTitle);

                // display the user bio
                let userBio = document.createElement("h1");
                userBio.innerText = `"${user.bio}"`;
                userBio.classList.add("my-4");
                userBio.classList.add("text-secondary");
                userBio.classList.add("text-center");
                cardBody.appendChild(userBio);

            })

    }


}