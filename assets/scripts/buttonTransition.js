document.addEventListener("DOMContentLoaded", () => {
    let mainContent = document.getElementById('content');
    let links = document.querySelectorAll('nav a');
    const main = document.querySelector('main'); 


    let isAnimating = false;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 

            if (isAnimating) return;
            isAnimating = true;

            let tab = link.dataset.tab; 

            let rect = main.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            
            main.style.setProperty('--x', `${x}px`);
            main.style.setProperty('--y', `${y}px`);

            main.classList.add('page-transition-exit');

            main.addEventListener('animationend', function exitAnimationHandler() {
               
                main.classList.remove('page-transition-exit');
                main.style.opacity = '0';

               
                fetchPage(tab, x, y);
            }, { once: true });
        });
    });

    function fetchPage(tab, x, y) {
        let url = `/${tab}/`; 

        fetch(url)
            .then(response => response.text())
            .then(html => {
                
                mainContent.innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('content').innerHTML;
                if (url == '/index/') {
                    main.style.backgroundColor = 'rgb(14, 17, 61)';
                }else if (url == '/project/') {
                    main.style.backgroundColor = 'rgb(85, 75, 115)';
                }else if (url == '/about/') {
                    main.style.backgroundColor = 'rgb(24, 2, 51)';
                    aboutSkillAnimationRotation();
                }

                main.style.setProperty('--x', `${x}px`);
                main.style.setProperty('--y', `${y}px`);


                main.classList.add('page-transition-enter');
                main.style.opacity = '1';

                main.addEventListener('animationend', function enterAnimationHandler() {
                   
                    main.classList.remove('page-transition-enter');
                    isAnimating = false; 
                }, { once: true });

                // Актуализираме URL адреса с HTML5 History API
                history.pushState(null, null, url);
                
              
            })
            .catch(error => {
                console.error('Error fetching page:', error);
            });
    }
});
