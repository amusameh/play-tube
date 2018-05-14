const select= (selector)=>{
   return document.querySelector(selector);
}

var popup = select('#successPopup');
console.log(popup);

if (popup) {
  popup.addEventListener('click', (e) => {
    popup.classList.add('hidden');
  })
}