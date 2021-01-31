let myLibrary = [];  


const title_form = document.querySelector(".form_input");  
const author_form = document.querySelector(".author_form");
const publish_form = document.querySelector(".publish_form"); 

const submit_btn = document.querySelector(".submit_btn");  
const dark_btn = document.querySelector(".dark_btn"); 
const overlay_btn = document.querySelector(".overlay_btn"); 
// const overlay_content = document.querySelector(".overlay-text-container"); 
const overlay_submit_btn = document.querySelector(".overlay_submit");
const overlay_bg = document.querySelector(".overlay-form");
 
const doc_body = document.querySelector("body"); 


const bookDisplay = document.querySelector(".grid");

function Book(title,author,publishingDate){ 
    this.title = title; 
    this.author = author; 
    this.publishingDate = publishingDate;   
    this.read  = false;

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

}  

 function hasBook(title, author){
     let hasBook = false;
    myLibrary.forEach(book => {
        if(book.title == title && book.author == author) hasBook = true; 
    }) 
    return hasBook;
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
            btn.parentNode.remove();
        }
    })
}
 
function resetForm(){
    let title = title_form;   
    let author = author_form; 
    let publish = publish_form; 
    
    title.value = ''; 
    author.value = ''; 
    publish.value = ''; 

    document.querySelector(".overlay_title").value = '';   
    document.querySelector(".overlay_author").value = ''; 
    document.querySelector(".overlay_date").value = '';   

}

function hasRead(btn){
    let bookTitle = btn.parentNode.firstChild.innerText;     
    myLibrary.forEach(book =>{
        if(book.title == bookTitle){   
            btn.classList.toggle("hasRead");
            book.read = !book.read;  
        }
    })
}

function overlayDisplayOn(){
    let overlay = document.querySelector(".overlay-form") 
    overlay.style.display = "block";
}

function overlayDisplayOff(){
    let overlay = document.querySelector(".overlay-form") 
    overlay.style.display = "none";
}



submit_btn.addEventListener('click',() =>{ 
    let title = title_form.value;   
    let author = author_form.value; 
    let publish = publish_form.value;   

    if(checkInput(title,author,publish)) return;
    if((hasBook(title,author))) return ;

    let book = new Book(title,author,publish); 
    book.addBookToLibraryArray(); 
    book.addBookToDisplay();  
    resetForm(); 
    
}) 

overlay_submit_btn.addEventListener('click',() =>{ 
    let title = document.querySelector(".overlay_title").value;   
    let author = document.querySelector(".overlay_author").value; 
    let publish = document.querySelector(".overlay_date").value;   

    if(checkInput(title,author,publish)) return;
    if((hasBook(title,author))) return ;

    let book = new Book(title,author,publish); 
    book.addBookToLibraryArray(); 
    book.addBookToDisplay();  
    resetForm(); 
    overlayDisplayOff();
})  


dark_btn.addEventListener('click', () =>{
    doc_body.classList.toggle("dark-mode");
})

overlay_btn.addEventListener('click', overlayDisplayOn);

overlay_bg.addEventListener('click',e =>{
    e.stopPropagation() 
    if(e.target && e.target.classList == "overlay overlay-form"){
       overlayDisplayOff();
    }
});

bookDisplay.addEventListener('click', (e) =>{
    e.stopPropagation();
    if(e.target && e.target.classList == "btn delete_btn"){
       deleteBook(e.target); 
    } 
    if(e.target && e.target.classList == "btn read_btn" || e.target && e.target.classList == "btn read_btn hasRead" ){
      hasRead(e.target); 
    } 
})


let book1 = new Book("Naruto", "Musashi Kishimoto", "1999"); 
let book2 = new Book("Hunter x Hunter", "Yoshihiro Togashi", "1999"); 

book2.addBookToLibraryArray(); 
book2.addBookToDisplay();
book1.addBookToLibraryArray();
book1.addBookToDisplay();









