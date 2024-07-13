if (window.location.pathname == '/about/') {
    aboutSkillAnimationRotation();
}
function aboutSkillAnimationRotation(){

    let firstArticle = document.querySelector('article');

    if (firstArticle && firstArticle.id !== 'about-pages') {
        return;
    }
    

    let items = document.querySelectorAll('.slider .list .item');
    let points = document.querySelectorAll('.navPoints .pageNumber');
    let prevBtn = document.getElementById('prev');
    let nextBtn = document.getElementById('next');
    let lastPosition = items.length - 1;
    let firstPosition = 0;
    let active = 0;
    let timeoutId = null;

    let listElement = document.querySelector('.slider .list');
    let logoURLarray = listElement.getAttribute('data-info').split(' ');

    if (nextBtn == null) {
        return;
    }
    
    nextBtn.onclick = () => {
        active += 1;
        setSlider();
        // openPDF();
    }
    prevBtn.onclick = () => {
        active -= 1;
        setSlider();
        // openPDF();
    }
    
    const setSlider = () => {
        if (!isMobileDevice()) {
            const main = document.querySelector('main');
            main.removeEventListener('mouseenter', mouseMove);
                console.log('about');
            document.removeEventListener('mousemove', followMouse);
            main.style.transform = `rotateX(0deg) rotateY(0deg)`;
            main.style.boxShadow = `0px 0px 20px rgba(64, 6, 112, 0.8)`;
        }
      
        listElement.style.setProperty('--before-background-image', `url(${logoURLarray[active]})`);
       
        let oldActive = document.querySelector('.slider .list .item.active');
        let oldActivePoints = document.querySelector('.pageNumber.activePoint');
        if(oldActive) oldActive.classList.remove('active');
        if(oldActivePoints) {
            oldActivePoints.classList.remove('activePoint');
            oldActivePoints.classList.add('NOactivePoint');
            
        }
        items[active].classList.add('active');
        points[active].classList.add('activePoint');
        points[active].classList.remove('NOactivePoint');
        // 
        nextBtn.classList.remove('d-none');
        prevBtn.classList.remove('d-none');
        if(active == lastPosition) nextBtn.classList.add('d-none');
        if(active == firstPosition) prevBtn.classList.add('d-none');
        
        if (!isMobileDevice()) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(()=>{
                main.addEventListener('mouseenter', mouseMove);
                console.log('body');
                document.addEventListener('mousemove', followMouse);
            
            },1500);
        }
        openPDF();
    }
    setSlider();
    
    
    const setDiameter = () => {
        let slider = document.querySelector('.slider');
        let widthSlider = slider.offsetWidth;
        let heightSlider = slider.offsetHeight;
        let diameter = Math.sqrt(Math.pow(widthSlider, 2) + Math.pow(heightSlider, 2));
        document.documentElement.style.setProperty('--diameter', diameter+'px');
        
    }
    setDiameter();
    window.addEventListener('resize', () => {
        setDiameter();
    })
}



