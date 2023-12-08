// This function will creates 9 list items per page.
function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.getElementsByClassName('student-list')[0];
   studentList.innerHTML = '';

   let studentInfo = '';
   
   //loops through the array of students and generates information on each student
   if (list.length === 0) {
      studentInfo += `<p class="no-results"> No Results Found </p>`;
    } else {
       for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         studentInfo += `
         <li class="student-item cf">        
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>    
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
          </div>
         </li>`;

      }
      }
      }
       studentList.insertAdjacentHTML("beforeend", studentInfo);
      }


// This is the pagination function that displays 9 per page
// and contains a button to go to pages 1-5
   function addPagination(list) {
         let numPage = Math.ceil(list.length / 9);
         const linkList = document.getElementsByClassName('link-list')[0];
         linkList.innerHTML = '';
         
         //loops through the addPagination variable 
         for(let i = 1; i <= numPage; i++) {
         linkList.insertAdjacentHTML('beforeend',
         `<li>
            <button type="button">${i}</button>
         </li>`);
         }

// This function waits for a click on the page numbers
      // and also changes the number of page buttons based on the letter entered into the search bar
       const firstButton = document.querySelector('button');
         firstButton.setAttribute("class","active");
         linkList.addEventListener('click',(e) =>{
            if(e.target.tagName === 'BUTTON'){
               const removeButton = document.querySelector('.active');
               removeButton.className = '';
               const addButton = e.target;
               addButton.className = 'active';
               const display = addButton.textContent;
               showPage(list,display);
            } 
          });
      }    

      // A simple search bar function
         function insertSearchBar() {
         const header = document.querySelector('.header');
         searchBar = `
         <label for="search" class="student-search">
                  <span>Search by name</span>
                  <input id="search" placeholder="Search by name...">
                  <button type="button" class="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
                </label>`;
            header.insertAdjacentHTML("beforeend", searchBar);
         }
      
      
      // calling specific functions
      showPage(data, 1); 
      addPagination(data); 
      insertSearchBar(); 
      
      
      
      const searchBtn = document.querySelector('button.submit');
      const searchField = document.getElementById('search');
      
      searchField.addEventListener('keyup', () => {
         let searchText = searchField.value.toUpperCase();
         searchBtn.onclick = () => {
            searchField.value = '';
            }

         //filters the number of students based on the contents of the search bar
            const filteredList = data.filter(student => {
               return (
                  student.name.first.toUpperCase().includes(searchText) ||
                  student.name.last.toUpperCase().includes(searchText)
               );
            });
            itemData = filteredList;
            currentPage = 1;
            showPage(itemData, currentPage);
            addPagination(itemData);
            
            });
      
