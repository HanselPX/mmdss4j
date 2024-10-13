document.addEventListener('DOMContentLoaded', function() {
    const itemImg = document.querySelector('.item-img img');
    const overlay = document.getElementById('overlay');
    const fullImage = document.getElementById('fullImage');

    // Cuando se hace clic en la imagen pequeña
    itemImg.addEventListener('click', function() {
        fullImage.src = this.src; // Establecemos la fuente de la imagen grande
        overlay.style.display = 'flex'; // Mostramos el overlay
    });

    // Cuando se hace clic en el overlay
    overlay.addEventListener('click', function() {
        overlay.style.display = 'none'; // Ocultamos el overlay
    });
});
