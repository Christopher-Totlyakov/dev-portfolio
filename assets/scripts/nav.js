const navContainer = document.getElementById('phone-nav-icon');
const menuBoxElement = document.querySelector('.menu-box');
let flagAnimation = false;

navContainer.addEventListener('click',() =>{
    
    if (!navContainer.classList.contains('open')) {
        if (flagAnimation) {
           return;
        }
        flagAnimation = true;
            menuBoxElement.classList.remove('transition-exit');
            navContainer.classList.add('open');
            menuBoxElement.classList.add('transition-enter');
            menuBoxElement.style.opacity = 1;
            
            setTimeout(()=> flagAnimation = false ,600);
    }else{
        if (flagAnimation) {
            return;
        }
        flagAnimation = true;
        menuBoxElement.classList.remove('transition-enter');
        navContainer.classList.remove('open');
        menuBoxElement.classList.add('transition-exit');
        menuBoxElement.style.opacity = 0;
        setTimeout(()=> flagAnimation = false ,700);
    }
})