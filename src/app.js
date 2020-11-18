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

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);


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

// Delete Posts
function deletePost(e){
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')){
        http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
            ui.showAlert('Post removed', 'alert alert-success');
            getPosts();
        })
        // .then(data => console.log(data))
        .catch(err => console.log(err));
        }
    }
}

// Enable edit state
function enableEdit(e){
    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        
        const data = {
            id,
            title,
            body
        }

        // Fill form with the current post
        ui.fillForm(data);
    }
}