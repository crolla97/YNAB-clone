//* Budget Controller
let budgetController = (function() {

})();

//* UI Controller
let UIController = (function() {

})();

//* Global Controller
let controller = (function(budgetCtrl, UICtrl) {

    document.querySelector('.add-category').addEventListener('click', function() {
        
        // Toggle overlay display
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'block';

        document.onclick = function(e) {
            if (e.target.id == 'overlay') {
                overlay.style.display = 'none';
            } else if (e.target.id == 'cancel') {
                overlay.style.display = 'none';
            } else if (e.target.id == 'primary') {
                overlay.style.display = 'none';
            }
        };
    });

})(budgetController, UIController);