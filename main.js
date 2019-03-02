//* Budget Controller
let budgetController = (function () {

})();

//* UI Controller
let UIController = (function () {

})();

//* Global Controller
let controller = (function (budgetCtrl, UICtrl) {
    // Toggle overlay display
    let addCat;

    addCat = document.querySelectorAll('.add-category');

    addCat.forEach(function (button) {
        button.addEventListener('click', function(event) {
            let x, y, overlay, popup;

            x = event.clientX;
            y = event.clientY;

            console.log(x, y);

            overlay = document.getElementById('overlay');
            popup = document.querySelector('.model');
            overlay.style.display = 'block';
            popup.style.top = `${y + 25}px`;
            popup.style.left = `${x - 115}px`;

            document.onclick = function (e) {
                if (e.target.id == 'overlay') {
                    overlay.style.display = 'none';
                } else if (e.target.id == 'cancel') {
                    overlay.style.display = 'none';
                } else if (e.target.id == 'primary') {
                    overlay.style.display = 'none';
                }
            };
        })
    });

})(budgetController, UIController);