if (window.location.pathname == '/about/') {
    moreInfoAbout();
}
function moreInfoAbout(){
    
    const button = document.querySelector('.moreInfo-button');
    const spotElements = document.querySelectorAll('.spot');
    const pElements = document.querySelectorAll('.container-moreInfo p');
    const skillsButtonElements = document.querySelector('.checkSkillsButton');
    
    let flag = true;
    button.addEventListener('click', () => {
        if (flag) {
            button.textContent = 'less info';
            button.style.backgroundColor = 'rgb(101, 115, 255)';
            flag = false;
            spotElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.display = 'block';
                }, 300 * index); // Увеличаваме времето за забавяне с индекса и 500ms
            });
            timeoutP = setTimeout(() => {
                pElements.forEach(p => p.style.display = 'block');
                skillsButtonElements.style.display = 'block';
            }, 300 * spotElements.length + 100);
        }else{
            clearTimeout(timeoutP)
            pElements.forEach(p => p.style.display = 'none');
            flag = true;
            button.textContent = 'more info';
            button.style.backgroundColor = 'rgb(144, 0, 201)';
            spotElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.display = 'none';
                    skillsButtonElements.style.display = 'none';
                }, 300 * index); // Увеличаваме времето за забавяне с индекса и 500ms
            });
        }

    });
}