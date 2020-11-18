//run...npm start
//npm run json:server

import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel edit state
document.querySelector('.card-form').addEventListener('click', cancelEdit);


// Get Posts
function getPosts(){
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// Add Posts
function submitPost(){
    const id = document.getElementById('#id').value;
    const title = document.getElementById('#title').value;
    const body = document.getElementById('#body').value;

    const data = {
            id,
            title,
            body
        }
    
    // Validate input
    if(title === '' || body === ''){
        ui.showAlert('Please fill all the fields', 'alert alert-danger');
    } else {
        // Check for id
        if(id === ''){
            http.post('http://localhost:3000/posts', data)
        .then(data => {
            ui.showAlert('Post added', 'alert alert-success');
            ui.clearFields();
            getPosts();
        })
        .catch(err => console.log(err));
        }else{
            // Update Post
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
                ui.showAlert('Post updated', 'alert alert-success');
                ui.changeFormState('add');
                getPosts();
        })
        .catch(err => console.log(err));
        }        
    }
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
    e.preventDefault();
}

// Cancel edit state
function cancelEdit(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add')
    }
    e.preventDefault();
}