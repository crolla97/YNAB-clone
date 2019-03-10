//* Budget Controller
let budgetController = (function () {

})();

//* UI Controller
let UIController = (function () {

    let DOMstrings = {
        addCategory: '.add-category',
        overlay: '.overlay',
        popup: '.model',
        popupInput: '.add-btn',
        categoryInput: '.category-name'
    }

    return {
        getCategoryInput: () => {
            return {
                name: document.querySelector(DOMstrings.categoryInput).value
            };
        },

        showCategoryPopup: () => {

            let x, y, overlay, popup;

            x = event.clientX;
            y = event.clientY;

            console.log(x, y);

            overlay = document.querySelector(DOMstrings.overlay);
            overlay.style.display = 'block';
            popup = document.querySelector(DOMstrings.popup);
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

        addCategoryItem: () => {
            
            // TODO 1. get category type, master or row

            // TODO 2. create HTML string with placeholder text

            // TODO 3. get category name

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
        let showPop, catName;
        
        showPop = document.querySelectorAll(DOM.addCategory);
        showPop.forEach(function (button) {
            button.addEventListener('click', function() {
                id = this.id;
                if (id == 'master') {
                    console.log('true');
                }  else {
                    console.log('false');
                }
            })
            
        });
        
        catName = document.querySelectorAll(DOM.popupInput);
        catName.forEach(function (e) {
            e.addEventListener('click', ctrlAddCategory);
        })
        
    };
    showCategory = () => {
        
        // 1. Reveal popup
        UICtrl.showCategoryPopup();
        
    }
    
    ctrlAddCategory = () => {
        let nameInput;
        
        nameInput = UICtrl.getCategoryInput();
        
        if (nameInput.name !== "") {
        }
    }
    
    return {
        init: function () {
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);
controller.init();