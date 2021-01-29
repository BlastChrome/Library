let myLibrary = [];  

let bookList = [];

const title_form = document.querySelector(".form_input");  
const author_form = document.querySelector(".author_form");
const publish_form = document.querySelector(".publish_form"); 

let delete_btns;  




const submit_btn = document.querySelector(".submit_btn");  

const bookDisplay = document.querySelector(".grid");


function Book(title,author,publishingDate){ 
    this.title = title; 
    this.author = author; 
    this.publishingDate = publishingDate;   

}  

Book.prototype.addBookToLibraryArray = function(){  
    myLibrary.push(this);
} 

Book.prototype.addBookToDisplay = function(){ 

    var bookContainer = document.createElement("div");  

  
    var titleContainer = document.createElement("p"); 
    var authorContainer = document.createElement("p"); 
    var readContainer = document.createElement("button");  
    var deleteContainer = document.createElement("button");    


    bookContainer.appendChild(titleContainer);
    bookContainer.appendChild(titleContainer);
    bookContainer.appendChild(authorContainer);
    bookContainer.appendChild(readContainer);
    bookContainer.appendChild(deleteContainer);
    
    bookContainer.classList.add("book");  
    titleContainer.innerHTML = this.title;
    authorContainer.innerHTML = this.author; 
    readContainer.innerText = "Read";
    deleteContainer.innerText = "Delete";
    
    readContainer.classList.add("btn"); 
    readContainer.classList.add("read_btn"); 
    deleteContainer.classList.add("btn");
    deleteContainer.classList.add("delete_btn");
    bookDisplay.appendChild(bookContainer); 

    bookList.push(bookContainer);
    delete_btns = document.querySelectorAll(".delete_btn"); 

} 



 function hasBook(title, author){
     let hasBook = false;
    myLibrary.forEach(book => {
        if(book.title == title && book.author == author) hasBook = true; 
    }) 
    return hasBook;
}

function displayBooksArray(){
    myLibrary.forEach((book, index) =>{
        console.log(book);
    })
}  

function checkInput(title, author, publish){ 
    if((title == "" || author == "" || publish == "")){ 
        return true;
    } 
    return false;
}

function deleteBook(btn){
    let bookTitle = btn.parentNode.firstChild.innerText;  

    myLibrary.forEach((book, index) =>{
        if(book.title == bookTitle){
            myLibrary.splice(index,1);  
            bookList.splice(index,1);  
            btn.parentNode.remove();
            console.log(myLibrary); 
            console.log(bookList); 
            console.log(bookDisplay);
        }
    })
}
 

let book1 = new Book("Naruto", "Musashi Kishimoto", "1999"); 
let book2 = new Book("Hunter x Hunter", "Yoshihiro Togashi", "1999"); 

book1.addBookToLibraryArray();
book1.addBookToDisplay();
book2.addBookToLibraryArray(); 
book2.addBookToDisplay();


submit_btn.addEventListener('click',() =>{
    let title = title_form.value;   
    let author = author_form.value; 
    let publish = publish_form.value;     

    if(checkInput(title,author,publish)) return;
    if((hasBook(title,author))) return ;

    let book = new Book(title,author,publish); 
    book.addBookToLibraryArray(); 
    displayBooksArray(); 
    book.addBookToDisplay(); 
})   

// delete_btns.forEach(btn =>{
//     btn.addEventListener('click',() =>{
//         deleteBook(btn);
//     })
// }) 




bookDisplay.addEventListener('click', (e) =>{
    e.stopPropagation();
    if(e.target && e.target.classList == "btn delete_btn"){
       deleteBook(e.target);
    }
})









