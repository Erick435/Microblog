"use strict";

const urlParams = new URLSearchParams(location.search);
const profileContainer = document.querySelector("#profileContainer");
const logoutButton = document.querySelector("#logoutButton");
const loginData = getLoginData();
const profile = document.querySelector("#profileIcon");

const createPersonalPost = document.querySelector("#createPersonalPost");

window.onload = function () {

    getProfileData();

    logoutButton.onclick = logout;

    profile.onclick = profileIcon;

    createPost();

    // submitButton.onclick = console.log("submit button clicked: " + cardText.value)

}

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

function createPost() {

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

                    // Create a form for the text and button
                    let form = document.createElement("form");
                    form.id = "form";
                    form.action = "../microblog/profile.html?id=" + loginData.username;
                    cardBody.appendChild(form);
                    
                    // create text area for the card body
                    let cardText = document.createElement("textarea");
                    cardText.classList.add("card-text");
                    cardText.classList.add("fs-4");
                    cardText.classList.add("form-control");
                    cardText.classList.add("my-5");
                    cardText.required = true;
                    cardText.rows = 5;
                    form.appendChild(cardText);

                    // create div for button
                    let buttonDiv = document.createElement("div");
                    buttonDiv.classList.add("text-center");
                    form.appendChild(buttonDiv);
                    
                    // create submit button to post
                    let submitButton = document.createElement("button");
                    submitButton.classList.add("btn");
                    submitButton.classList.add("btn-outline-dark");
                    submitButton.classList.add("my-3");
                    submitButton.classList.add("fs-3");
                    submitButton.innerText = "Create Post";
                    buttonDiv.appendChild(submitButton);
                    
                    submitButton.addEventListener("click", () => {
                        getPostData(cardText.value);
                    });
                });
        }

    }

}

function getPostData(text, event) {

    if (text != ""){
        event.preventDefault();
        console.log(`Text sent: ${text}`);
        
    }
    
}

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