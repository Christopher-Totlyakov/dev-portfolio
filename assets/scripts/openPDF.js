document.addEventListener('DOMContentLoaded', () => {
    const certificateButton = document.querySelector('.certificateButton');
    
    certificateButton.addEventListener('click', (event) => {
        event.preventDefault();  // Прекратява стандартното действие на връзката

        const url = certificateButton.getAttribute('href');
        
        // Отваря URL адреса в нов прозорец или таб
        console.log(url);
        window.open(url, '_blank');
    });
});
