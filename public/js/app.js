const select= (selector)=>{
   return document.querySelector(selector);
}


const dropMenuIcon = document.getElementById('dropMenuIcon');
const dropMenu = document.getElementById('dropMenu')

dropMenuIcon.addEventListener('click', (e) => {
  e.preventDefault();
  dropMenu.classList.toggle('hidden')
})


