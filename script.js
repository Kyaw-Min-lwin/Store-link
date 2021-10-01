// for the home page

// all the folders the user create will be in this object
let folders = {};
let homeContainer = document.querySelector('#home-container');
let createFolderBtn = document.querySelector("#create-folder");

// create an input field for te folder name
let folderNameInputField = document.createElement('input');
folderNameInputField.placeholder = 'Enter folder name';

// localStorage.clear();
// where the folder names are going to be stored
let folderNameStr = '';
let folderNameArr = [];

// folder img
let folderImg = document.createElement('img');
folderImg.src = 'folder.jpg';
folderImg.id = 'folder-img'

// the delete btn
let deleteBtn = document.createElement('button');
deleteBtn.innerHTML = 'delete';
deleteBtn.classList.add('delete-btn');

// show the folders that the user might have created
showFolders();
let s = 'testing'
s.length / 2 ? s.slice(s.length / 2 - 1, s.length) : s[Math.floor(s.length / 2)];

// add the input field so the user can enter the name of the folder they want to create
createFolderBtn.addEventListener('click', () => {
    createFolderBtn.after(folderNameInputField);
}, false)
// if the user click enter after writing the name of the folder in the input field
folderNameInputField.addEventListener("keypress", e => {
    if (e.key === 'Enter') {
        // if the folder already doesnt exist and the input is not ''
        if (folderNameArr.includes(folderNameInputField.value) === false && folderNameInputField.value !== '') {
            folderNameStr = folderNameInputField.value;
            // folders[folderNameInputField.value] = [];
            homeContainer.removeChild(folderNameInputField);
            showFolders(folderNameStr);
            folderNameInputField.value = '';
        }
    }
});

function deleteFolders() {
    // all the delete buttons
    let deleteButtons = [...document.getElementsByClassName('delete-btn')];
    // for every delete button is clicked
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            // get the index of the folder to remove
            indexOfFolderToRemove = deleteButtons.indexOf(deleteButton);
            console.log([...folderNameArr]);
            folderNameArr.splice(indexOfFolderToRemove, 1);
            console.log(folderNameArr);
            [...document.getElementsByClassName('folder')][indexOfFolderToRemove].remove();
            localStorage.setItem('folderNameArr', JSON.stringify(folderNameArr));
        })
    })
    showFolders();
}

// create the visuals of the folders
function showFolders(str) {
    if (str) {
        let a = document.createElement('div');
        a.classList.add('folder');
        a.innerHTML += `${folderImg.outerHTML}<p>${str}</p>${deleteBtn.outerHTML}`;
        folderNameArr.push(str);
        homeContainer.append(a);
        localStorage.setItem('folderNameArr', JSON.stringify(folderNameArr));
        deleteFolders();
    }
    else {
        folderNameArr = JSON.parse(localStorage.getItem('folderNameArr'));
        if (folderNameArr) {
            console.log('no str')
            folderNameArr.forEach(foldername => {
                let k = document.createElement('div');
                k.classList.add('folder');
                k.innerHTML = `${folderImg.outerHTML}<p>${foldername}</p>${deleteBtn.outerHTML}`;
                // k.append(deleteBtn)
                homeContainer.append(k);
            })
        }
        else {
            folderNameArr = [];
        }
    }
    return false;
}


// let inputField = document.querySelector('input');
// let addLinkBtn = document.querySelector('#add-link-btn');
// let ulLink = document.querySelector('ul');
// let linkArr = [];
// let linksFromLocalStorrage = JSON.parse(localStorage.getItem('links'));


// if (linksFromLocalStorrage) {
//     linkArr = [...linksFromLocalStorrage];
//     render();
// }

// addLinkBtn.addEventListener('click', () => {
//     if (inputField.value) {
//         linkArr.push(inputField.value);
//         inputField.value = '';
//         localStorage.setItem('links', JSON.stringify(linkArr));
//         render();
//     }
// })

// function render() {
//     let linkStr = '';
//     linkArr.forEach(link => {
//         linkStr += `<a href='${link}' target='_blanks'><li>${link}</li></a>`
//     })
//     ulLink.innerHTML = linkStr;
// }