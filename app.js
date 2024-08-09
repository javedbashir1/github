let search = document.querySelector('.search input');
let searchBtn = document.querySelector('.search button');
let profilePicture = document.getElementById('profile-pic');
let name = document.getElementById('name');
let userName = document.getElementById('username');
let followers = document.getElementById('followers');
let following = document.getElementById('following');
let userlocation = document.getElementById('location');
let followBtn = document.querySelector('.follow-btn');
let userDetails = document.querySelector('.user-detail');
let found = document.querySelector('.found');
let notFound = document.querySelector('.not-found');
let inputError = document.querySelector('.input-error');

function getData(){
    if(search.value.trim() !== ''){
        inputError.innerHTML = '';
        userDetails.classList.remove('active');
        notFound.classList.remove('active');
        found.classList.remove('active');
        inputError.innerHTML = `<p id='loading'>Loading...</p>`;
        let loading = document.getElementById('loading').style.color = 'blue';
        fetchData()
    }
    else{
        userDetails.classList.remove('active');
        notFound.classList.remove('active');
        found.classList.remove('active');
        inputError.innerHTML = `<p id='error'>Please input a profile name</p>`;
        let error = document.getElementById('error').style.color = 'red';
    }
}

function fetchData(){
    fetch(`https://api.github.com/users/${search.value}`)
    .then((res) => {
        if(res.status == '404'){
            throw new Error();   
        }
        return res.json();
    })
    .then((data) => {
        inputError.innerHTML = '';
        userDetails.classList.add('active');
        notFound.classList.remove('active');
        found.classList.add('active');
        showData(data);
    })
    .catch((err) => {
        userDetails.classList.add('active');
        notFound.classList.add('active');
        found.classList.remove('active');
        inputError.innerHTML = `<p class='error'>${err.message}</p>`;
        search.value = '';
    })
}

function showData(userData){
    profilePicture.src = `${userData.avatar_url}`;
    name.innerText = `${userData.name}`;
    userName.innerText = `${userData.login}`;
    followers.innerText = `${userData.followers} followers`;
    following.innerText = `${userData.following} following`;
    userlocation.innerText = `${userData.location}`;
    followBtn.href = `${userData.html_url}`;
    search.value = '';
}

searchBtn.addEventListener('click',getData);
search.addEventListener('keyup',(e) => {
    if(e.key === "Enter"){
        getData();
    }
})
search.addEventListener('click',() => {
    inputError.innerHTML = '';
})