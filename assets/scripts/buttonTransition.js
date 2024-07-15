document.addEventListener("DOMContentLoaded", () => {
    let mainContent = document.getElementById('content');
    let links = document.querySelectorAll('nav a');
    const main = document.querySelector('main'); 

//navigakiata v istoriata napred nazad
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

            let url = `/${tab}/`;
             // Актуализираме URL адреса с HTML5 History API
             history.pushState({}, '', url);//
                fetchPage(url, x, y);
            }, { once: true });
        });
    });

    function fetchPage(url, x, y) {

        fetch(url)
            .then(response => response.text())
            .then(html => {
                
                mainContent.innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('content').innerHTML;
                if (url == '/index/' || url == '') {
                    main.style.backgroundColor = 'rgb(14, 17, 61)';
                }else if (url == '/project/') {
                    main.style.backgroundColor = 'rgb(85, 75, 115)';
                }else if (url == '/about/') {
                    main.style.backgroundColor = 'rgb(10, 7, 52)'
                }else if (url == '/skills/') {
                    main.style.backgroundColor = 'rgb(24, 2, 51)';
                    aboutSkillAnimationRotation();
                    openPDF();
                }

                main.style.setProperty('--x', `${x}px`);
                main.style.setProperty('--y', `${y}px`);


                main.classList.add('page-transition-enter');
                main.style.opacity = '1';

                main.addEventListener('animationend', function enterAnimationHandler() {
                   
                    main.classList.remove('page-transition-enter');
                    isAnimating = false; 
                }, { once: true });

               
              
            })
            .catch(error => {
                console.error('Error fetching page:', error);
            });
    }
     // Обработчик за събитието popstate
    window.addEventListener('popstate', () => {
        

            let rect = main.getBoundingClientRect();
            let x = rect.width / 2; // Центрирано по хоризонтал
            let y = rect.height / 2; // Центрирано по вертикал
            fetchPage(window.location.pathname, x, y);

        
    });
});