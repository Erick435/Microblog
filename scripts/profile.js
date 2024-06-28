"use strict";

const urlParams = new URLSearchParams(location.search);
const profileContainer = document.querySelector("#profileContainer");
const logoutButton = document.querySelector("#logoutButton");
const profile = document.querySelector("#profileIcon");

const createPersonalPost = document.querySelector("#createPersonalPost");

const profilePlacement = document.querySelector("#profilePlacement");
const tabsContentPlacement = document.querySelector("#tabsContentPlacement");

const loginData = getLoginData();

window.onload = function () {

    getProfileData();
    logoutButton.onclick = logout;
    profile.onclick = profileIcon;

    showPersonalOptions();

}

// adding the icon (header) with functionality to go to personal profile
function profileIcon() {

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
            window.location.href = "/profile.html?id=" + loginData.username;

        })
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

                    createPostContent.appendChild(card);

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

    const postsContent = document.querySelector("#postsContent");
    postsContent.innerText = "";
    
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`
        },
    };

    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?username=" + loginData.username, options)
        .then((response) => response.json())
        .then((posts) => {

            for (let post of posts) {

                // create div for bootstrap card
                let cardContainer = document.createElement("div");
                cardContainer.classList.add("card");
                cardContainer.classList.add("my-4");
                cardContainer.style.width = "31rem";
                postsContent.appendChild(cardContainer)

                // create div for card body inside card container
                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                cardContainer.appendChild(cardBody);

                // Link to the profile page
                let profilePage = document.createElement("a")
                profilePage.href = "/profile.html?id=" + post.username;
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

// PERSONAL PROFILE OPTIONS (create post, show personal posts, show likes)
function showPersonalOptions() {
    
    let id = '';

    if (urlParams.has("id") === true) {
        id = urlParams.get("id");
        if (id == loginData.username) {

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

    // ======================= NAV TABS FOR PERSONAL PROFILE =============================
                    let profileOptionsContainer = document.createElement("div");
                    profileOptionsContainer.id = "profileOptions";
                    profileOptionsContainer.classList.add("my-4");
                    profilePlacement.appendChild(profileOptionsContainer);

                    // unordered list for nav tabs
                    let ulNavTabs = document.createElement("ul");
                    ulNavTabs.classList.add("nav");
                    ulNavTabs.classList.add("nav-tabs");
                    ulNavTabs.classList.add("d-flex");
                    ulNavTabs.classList.add("justify-content-center");
                    ulNavTabs.id = "myTab";
                    ulNavTabs.role = "tablist";
                    profileOptionsContainer.appendChild(ulNavTabs);
                    
                    // list item for create Post
        // LIST ITEM AND BUTTON FOR CREATE POST TABLE
                    let createPostItem = document.createElement("li");
                    createPostItem.classList.add("nav-item");
                    createPostItem.role = "presentation";
                    ulNavTabs.appendChild(createPostItem);

                    // button for create post item
                    let createPostButton = document.createElement("button");
                    createPostButton.classList.add("nav-link");
                    createPostButton.classList.add("active");
                    createPostButton.classList.add("fs-5");
                    createPostButton.id = "createPostTab";
                    createPostButton.setAttribute("data-bs-toggle", "tab");
                    createPostButton.setAttribute("data-bs-target", "#createPostContent");
                    createPostButton.type = "button";
                    createPostButton.innerText = "Create Post";
                    createPostItem.appendChild(createPostButton);

                    // list item for show personal posts
        // LIST ITEM AND BUTTON FOR POSTS
                    let showPostsButton = document.createElement("li");
                    showPostsButton.classList.add("nav-item");
                    showPostsButton.role = "presentation";
                    ulNavTabs.appendChild(showPostsButton);

                    let postsButton = document.createElement("button");
                    postsButton.classList.add("nav-link");
                    postsButton.classList.add("fs-5");
                    postsButton.id = "postsTab";
                    postsButton.setAttribute("data-bs-toggle", "tab");
                    postsButton.setAttribute("data-bs-target", "#postsContent");
                    postsButton.type = "button";
                    postsButton.innerText = "Posts";
                    showPostsButton.appendChild(postsButton);

    //  ======================== TAB CONTENT ==============================
                    
                    // div to contain ALL content
                    let tabContent = document.createElement("div");
                    tabContent.classList.add("tab-content");
                    tabsContentPlacement.appendChild(tabContent);

    // ========================= CREATE A DIV TO SHOW CREATE POST CONTENT
                    let showCreatePostContent = document.createElement("div");
                    showCreatePostContent.classList.add("tab-pane");
                    showCreatePostContent.classList.add("fade");
                    showCreatePostContent.classList.add("show");
                    showCreatePostContent.classList.add("active");
                    showCreatePostContent.id = "createPostContent";
                    showCreatePostContent.role = "tabpanel";
                    tabContent.appendChild(showCreatePostContent);

                    // create div for content
                    let createPostContentDiv = document.createElement("div");
                    createPostContentDiv.id = "createPersonalPost";
                    showCreatePostContent.appendChild(createPostContentDiv);

            
    // ========================= CREATE A DIV TO SHOW POSTS CONTENT
                    let showPostsContent = document.createElement("div");
                    showPostsContent.classList.add("tab-pane");
                    showPostsContent.classList.add("fade");
                    showPostsContent.classList.add("d-flex");
                    showPostsContent.classList.add("flex-column");
                    showPostsContent.classList.add("align-items-center");
                    showPostsContent.id = "postsContent";
                    showPostsContent.role = "tabpanel";
                    tabContent.appendChild(showPostsContent);

                    // create a div for posts content
                    let postsContentDiv = document.createElement("div");
                    postsContentDiv.id = "showPersonalPost";
                    showPostsContent.appendChild(postsContentDiv);
    

        // ================ HANDLES FUNCTION TO CREATE POST OR SHOW POSTS ==========
                    createPostButton.addEventListener("click", () => {
                        profileShowTextField();
                    });

                    postsButton.addEventListener("click", () => {
                        showPersonalPosts();
                    });


                    // show text field (create post) on startup
                    profileShowTextField();

                });
        }
    }
}


// ========================= SHOW OTHER USERS PROFILES ==========================
function getProfileData() {

    let id = '';

    if (urlParams.has("id") === true) {
        id = urlParams.get("id");

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