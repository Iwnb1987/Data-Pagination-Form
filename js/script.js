// This function will creates 9 list items per page.
function showPage(list, page) {
   const endIndex = page * 9;
   document.getElementsByClassName('student-list')[0].innerHTML = '';

   let studentInfo = '';
   
   //loops through the array of students and generates information on each student
   if (list.length === 0) {
      studentInfo += `<p class="no-results"> No Results Found </p>`;
    } else {
       for (let i = 0; i < list.length; i++) {
      if (i >= (page * 9) - 9 && i < endIndex) {
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
       document.getElementsByClassName('student-list')[0].insertAdjacentHTML("beforeend", studentInfo);
      }


// This is the pagination function that displays 9 per page and contains a button to go to pages 1-5
   function addPagination(list) {
         document.getElementsByClassName('link-list')[0].innerHTML = '';
          for(let i = 1; i <= Math.ceil(list.length / 9); i++) {    //loops through the addPagination keyword
         document.getElementsByClassName('link-list')[0].insertAdjacentHTML('beforeend',
         `<li>
            <button type="button">${i}</button>
         </li>`);
         }

// This function waits for a click on the page numbers. Also changes the number of page buttons based on the letter entered into the search bar
         document.querySelector('button').setAttribute("class","active");
         document.getElementsByClassName('link-list')[0].addEventListener('click',(e) => {
            if(e.target.tagName === 'BUTTON') {
               document.querySelector('.active').className = '';
               e.target.className = 'active';
               showPage(list, e.target.textContent);
            } 
          });
      }    

      // A simple search bar function
         function insertSearchBar() {
         searchBar = `
         <label for="search" class="student-search">
                  <span>Search by name</span>
                  <input id="search" placeholder="Search by name...">
                  <button type="button" class="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
                </label>`;
            (document.querySelector('.header')).insertAdjacentHTML("beforeend", searchBar);
         }
      
       // calling specific functions
      showPage(data, 1); 
      addPagination(data); 
      insertSearchBar(); 
      
      document.getElementById('search').addEventListener('keyup', () => {
         document.querySelector('button.submit').onclick = () => {
            document.getElementById('search').value = '';
            }

         //filters the number of students based on the contents of the search bar
            itemData = data.filter(student => {
               return (
                  student.name.first.toUpperCase().includes((document.getElementById('search')).value.toUpperCase()) ||
                  student.name.last.toUpperCase().includes((document.getElementById('search')).value.toUpperCase())
               );
            });
            currentPage = 1;
            showPage(itemData, currentPage);
            addPagination(itemData);
            });
