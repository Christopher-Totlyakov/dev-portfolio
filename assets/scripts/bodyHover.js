//pride

const main = document.querySelector('main');

let wewe = () => {
    document.addEventListener('mousemove', followMouse);
}
        main.addEventListener('mouseenter', wewe);
        console.log('body');

        main.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', followMouse);
            main.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            main.style.boxShadow = '0 4px 8px rgba(64, 6, 112, 0.2)';
        });

        function followMouse(e) {
            const rect = main.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            const halfWidth = rect.width / 2;
            const halfHeight = rect.height / 2;

            const dx = offsetX - halfWidth;
            const dy = offsetY - halfHeight;

            const tiltX = (dy / halfHeight) * 10; 
            const tiltY = -(dx / halfWidth) * 10; 

            const shadowX = (dx / halfWidth) * 20; 
            const shadowY = (dy / halfHeight) * 20; 

            main.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            main.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(64, 6, 112, 0.8)`;
        }