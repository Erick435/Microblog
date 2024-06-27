"use strict";

const bodyContainer = document.querySelector("#bodyContainer");
const logoutButton = document.querySelector("#logoutButton");
const loginData = getLoginData();
const profile = document.querySelector("#profileIcon");

window.onload = function () {

    getAllPosts();

    logoutButton.onclick = logout;

    profile.onclick = profileIcon;
    
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
    



function getAllPosts() {

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`
        },
    };

    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", options)
        .then((response) => response.json())
        .then((posts) => {

            for (let post of posts) {

                // create div for bootstrap card
                let cardContainer = document.createElement("div");
                cardContainer.classList.add("card");
                cardContainer.classList.add("my-4");
                cardContainer.style.width = "31rem";
                bodyContainer.appendChild(cardContainer)

                // create div for card body inside card container
                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                cardContainer.appendChild(cardBody);

                // Link to the profile page
                let profilePage = document.createElement("a")
                profilePage.href = "../microblog/profile.html?id=" + post.username;
                cardBody.appendChild(profilePage);

                // create card title h4
                let cardTitle = document.createElement("h4");
                cardTitle.classList.add("card-title");
                cardTitle.classList.add("my-2");
                cardTitle.classList.add("text-primary");
                cardTitle.innerText = `@${post.username}`;
                profilePage.appendChild(cardTitle);


                // create card main text
                let mainText = document.createElement("h2");
                mainText.classList.add("card-text");
                mainText.classList.add("my-4");
                mainText.innerText = `${post.text}`;
                cardBody.appendChild(mainText);

                // show the timestamp Date when created 
                let dateCreated = document.createElement("h6");
                dateCreated.classList.add("sub-title");
                dateCreated.classList.add("text-muted");
                dateCreated.classList.add("my-3");
                dateCreated.innerText = `Created at: ${post.createdAt.split('T')[0]}`;
                cardBody.appendChild(dateCreated);
            }
        })

}