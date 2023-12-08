// a showpage function followed by two key variables that multiply the page by the objects per page.
function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.getElementsByClassName('student-list')[0];
   studentList.innerHTML = '';

   let studentInfo = '';
  
   //this matches the letters to students in the search bar
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


// function that adds the search button to the page
   function createButton(list) {
   let addPagination = Math.ceil(list.length / 9);
   const linkList = document.getElementsByClassName('link-list')[0];
   linkList.innerHTML = '';
   
   //loops through the addPagination variable 
   for(let i = 1; i <= addPagination; i++) {
   linkList.insertAdjacentHTML('beforeend',
   `<li>
      <button type="button">${i}</button>
   </li>`);
   }


   const firstbutton = document.querySelector('button');
   firstbutton.setAttribute("class","active");
   linkList.addEventListener('click',(e) =>{
      if(e.target.tagName === 'BUTTON'){
         const removebutton = document.querySelector('.active');
         removebutton.className = '';
         const addbutton = e.target;
         addbutton.className = 'active';
         const display = addbutton.textContent;
         showPage(list,display);
      } 
    });
}    

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



showPage(data, 1); 
createButton(data); 
insertSearchBar(); 


// ensures the page works and displays 
const searchBtn = document.querySelector('button.submit');
const searchField = document.getElementById('search');

searchField.addEventListener('keyup', () => {
   let searchText = searchField.value.toUpperCase();
   searchBtn.onclick = () => {
      searchField.value = '';
      }

      const filteredList = data.filter(student => {
         return (
            student.name.first.toUpperCase().includes(searchText) ||
            student.name.last.toUpperCase().includes(searchText)
         );
      });
      itemData = filteredList;
      currentPage = 1;
      showPage(itemData, currentPage);
      createButton(itemData);
      
      });
