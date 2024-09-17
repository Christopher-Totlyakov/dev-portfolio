function openPDF(){
    if (isMobileDevice() && (window.location.pathname == '/skills/' || window.location.pathname == '/skills')) {
        
            const certificateButton = document.querySelectorAll('.item.active .certificateButton');
            const pdfViewer = document.getElementById('pdfViewer');
            const mainElement = document.querySelector('main');
            const hidingButtonPDFElement = document.querySelector('.hidingButtonPDF');

            hidingButtonPDFElement.addEventListener('click', () => {
                mainElement.style.display = 'block';
                pdfViewer.style.display = 'none';
                hidingButtonPDFElement.style.display = 'none';
                
                //setDiameter();
                let slider = document.querySelector('.slider');
                let widthSlider = slider.offsetWidth;
                let heightSlider = slider.offsetHeight;
                let diameter = Math.sqrt(Math.pow(widthSlider, 2) + Math.pow(heightSlider, 2));
                document.documentElement.style.setProperty('--diameter', diameter+'px');

            }, {ones: true})
        
            certificateButton.forEach(button => button.addEventListener('click', (event) => {
            
                event.preventDefault();
                const url = button.getAttribute('href');

                loadPDF(url);
            }));
        
            function loadPDF(url) {
                const loadingTask = pdfjsLib.getDocument(url);
                loadingTask.promise.then((pdf) => {
                    pdfViewer.innerHTML = '';
                    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                        renderPage(pdf, pageNum);
                    }
                    mainElement.style.display = 'none';
                    pdfViewer.style.display = 'block';
                    hidingButtonPDFElement.style.display = 'block';
                }, (reason) => {
                    console.error(reason);
                });
            }
        
            function renderPage(pdf, pageNum) {
                pdf.getPage(pageNum).then((page) => {
                    const viewport = page.getViewport({ scale: 1 });
                    const containerWidth = pdfViewer.clientWidth;
                    const scale = containerWidth / viewport.width;
                    const scaledViewport = page.getViewport({ scale });
                
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = scaledViewport.height;
                    canvas.width = scaledViewport.width;
                
                    const renderContext = {
                        canvasContext: context,
                        viewport: scaledViewport
                    };
                
                    const pageDiv = document.createElement('div');
                    pageDiv.className = 'page';
                    pageDiv.appendChild(canvas);
                    pdfViewer.appendChild(pageDiv);
                
                    page.render(renderContext).promise.then(() => {
                        console.log(`Page ${pageNum} rendered`);
                    });
                });
            }
    }
}