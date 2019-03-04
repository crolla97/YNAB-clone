//* Budget Controller
let budgetController = (function () {

})();

//* UI Controller
let UIController = (function () {

    let DOMstrings = {
        addCategory: '.add-category',
        overlay: '.overlay',
        popup: '.model',
        popupInput: '.add-btn'
    }

    return {

        getCategoryInput: () => {
            return {
                name: document.querySelector(DOMstrings.addCategory)
            }
        },

        showCategoryPopup: () => {

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

        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();

//* Global Controller
let controller = (function (budgetCtrl, UICtrl) {

    let setupEventListeners = function () {
        let DOM = UICtrl.getDOMstrings();

        // Toggle overlay display
        let showPop;

        showPop = document.querySelectorAll('.add-category');

        showPop.forEach(function (button) {
            button.addEventListener('click', ctrlAddCategory);
        });


    };

    ctrlAddCategory = () => {

        // UICtrl.showCategoryPopup();

        UICtrl.showCategoryPopup();

        // TODO 1. Get field input data

        // TODO 2. Add the item to the UI
    }

    return {
        init: function () {
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();