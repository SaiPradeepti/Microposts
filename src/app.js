//run...npm start
//npm run json:server

import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', addPost);

// Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost);

// Get Posts
function getPosts(){
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// Add Posts
function addPost(){
    http.post('http://localhost:3000/posts',{
        "id": document.getElementById('id').value,
        "title": document.getElementById('title').value,
        "body": document.getElementById('body').value
    })
    .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
    })
    .catch(err => console.log(err));
}

//Delete Posts
function deletePost(e){
    e.preventDefault();
    if(e.target.classList.contains('fa-times')){
    const id = e.target.parentElement.dataset.id;
    http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
            getPosts();
        })
        // .then(data => console.log(data))
        .catch(err => console.log(err));
        }
}