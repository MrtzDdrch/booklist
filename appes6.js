class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){
    const list = document.querySelector('#book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
  }

  deleteBook(target){
    target.parentElement.parentElement.remove();
    this.showAlert('Book removed!', 'success');
  }

  clearInputFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  showAlert(message, className){
    // create Div
    const div = document.createElement('div');
    // Add class name
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Timeout after x seconds
    setTimeout(() => {
      document.querySelector('.alert').remove();
    },3000);
  }
}

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

  // Instantiate UI
  const ui = new UI();

  // Proceed only if inputs are valid
  if(title != '' && author != '' && isbn != ''){    
    // Instantiate book
    const book = new Book(title, author, isbn);

    // Add book to list
    ui.addBookToList(book);

    // Show confirmation alert
    ui.showAlert('Book successfully added to list', 'success');

    // Clear input fields
    ui.clearInputFields();
  } else {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  }
  
});

document.getElementById('book-list').addEventListener('click', (e) => {
  e.preventDefault();
  // Instantiating UI
  const ui = new UI();
  // Delete book if everything checks out
  if(e.target.className === 'delete'){
    ui.deleteBook(e.target);
  }
})