document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');
    let editMode = false;
    let editElement = null;

    postForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const image = document.getElementById('post-image').value;

        if (editMode) {
            editElement.querySelector('h4').textContent = title;
            editElement.querySelector('img').src = image;
            editElement.querySelector('img').alt = title;
            editElement.querySelector('p').textContent = content;
            editMode = false;
            editElement = null;
        } else {
            const listItem = document.createElement('li');
            listItem.classList.add('post');
            listItem.innerHTML = `
                <h4>${title}</h4>
                <img src="${image}" alt="${title}" style="max-width: 100px; height: auto;">
                <p>${content}</p>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;

            postList.appendChild(listItem);
    
            listItem.querySelector('.edit-button').addEventListener('click', function() {
                document.getElementById('post-title').value = title;
                document.getElementById('post-content').value = content;
                document.getElementById('post-image').value = image;
                editMode = true;
                editElement = listItem;
            });

            
            listItem.querySelector('.delete-button').addEventListener('click', function() {
                postList.removeChild(listItem);
            });
        }

        postForm.reset();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const postList = document.getElementById('post-list');
    const posts = postList.getElementsByClassName('post');

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();

        Array.from(posts).forEach(function(post) {
            const title = post.querySelector('h2').textContent.toLowerCase();
            if (title.includes(query)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
});

