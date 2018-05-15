const select= (selector)=>{
   return document.querySelector(selector);
}

var popup = select('#successPopup');
function removePopup(e) {
  popup.classList.add('hidden');
}
if (popup) {
    window.addEventListener('click', removePopup, { once: true, capture: true })
}

const dropMenuIcon = document.getElementById('dropMenuIcon');
const dropMenu = document.getElementById('dropMenu')

dropMenuIcon.addEventListener('click', (e) => {
  e.preventDefault();
  dropMenu.classList.toggle('hidden')
})
