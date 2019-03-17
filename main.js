//* Budget Controller
let budgetController = (function () {

    const masterConst = function (type, id) {
        this.type = type;
        this.id = id;
    };

    const subConst = function (type, id) {
        this.type = type;
        this.id = id;
    };

    let categoryData = {
        catType: {
            master: [],
            sub: []
        }
    };

    return {
        addItem: function (type) {
            let newItem, ID;

            // Create new ID
            if (categoryData.catType[type].length > 0) {
                ID = categoryData.catType[type][categoryData.catType[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on'inc' or 'exp' type
            if (type === 'master') {
                newItem = new masterConst(type, ID);
            } else if (type === 'sub') {
                newItem = new subConst(type, ID);
            }

            // Push it into our data structure
            categoryData.catType[type].push(newItem);

            // Return the new element
            return newItem;
        },

        getChildren: function (row) {
            let child, children
            child = row.target.parentElement.parentElement.parentElement.nextElementSibling;
            // console.log(child);
            // console.log(child.nextElementSibling);
            children = [];
            while (child.classList.contains('sub-category')) {
                children.push(child);
                child = child.nextElementSibling;
                row = child;
            }
            return children;
        },

        testing: () => {
            console.log(categoryData);
        }
    }

})();

//* UI Controller
let UIController = (function () {

    let DOMstrings = {
        addCategory: '.add-category',
        mastCategory: '.add-category-master',
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

            overlay = document.querySelector(DOMstrings.overlay);
            overlay.style.display = 'block';
            popup = document.querySelector(DOMstrings.popup);
            popup.style.top = `${y + 25}px`;
            popup.style.left = `${x - 115}px`;

            document.querySelector(DOMstrings.categoryInput).focus();

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

        addCategoryItem: (item, name) => {
            let table, newRow, cell1, cell2, cell3,
                cell4, cell5, subRow;

            // Get table
            table = document.getElementById('budget-table');

            // Get category type
            if (item.type === 'master') {
                console.log('I am a master');
                newRow = table.insertRow(0);
                newRow.classList.add('budget-table-row');
                newRow.classList.add('master-category');

                table.rows[0].setAttribute("id", item.id);

                cell1 = newRow.insertCell(0);
                cell2 = newRow.insertCell(1);
                cell3 = newRow.insertCell(2);
                cell4 = newRow.insertCell(3);
                cell5 = newRow.insertCell(4);

                cell1.classList.add('budget-table-checkbox');
                cell2.classList.add('budget-table-name');
                cell3.classList.add('budget-table-budgeted');
                cell4.classList.add('budget-table-activity');
                cell5.classList.add('budget-table-available');

                cell2.innerHTML = `${name}`;
                cell3.innerHTML = '£0.00';
                cell4.innerHTML = '£0.00';
                cell5.innerHTML = '£0.00';

                let checkboxHtml = `<div class="checkbox-wrapper">
                                    <input type="checkbox" id="category-checkbox">
                                </div>`;
                table.rows[0].cells.item(0).insertAdjacentHTML('afterbegin', checkboxHtml);

                let arrowDown = `<button class="arrow-toggle">
                                <img src="/images/caret-down.svg" alt="sort arrow">
                             </button>`;
                table.rows[0].cells.item(1).insertAdjacentHTML('afterbegin', arrowDown);

                let plusHtml = `<button class="add-category inside-add" id="row">
                                <img src="/images/plus-sign-in-a-circle.svg" alt="add category">
                            </button>`;
                table.rows[0].cells.item(1).insertAdjacentHTML('beforeend', plusHtml);

            } else if (item.type === 'sub') {
                console.log('I am a sub');
                getParentRow = document.getElementById('parent');
                subRow = getParentRow.rowIndex + 1;

                newRow = table.insertRow(subRow);
                newRow.classList.add('budget-table-row');
                newRow.classList.add('sub-category');

                table.rows[subRow].setAttribute("id", item.id);

                cell1 = newRow.insertCell(0);
                cell2 = newRow.insertCell(1);
                cell3 = newRow.insertCell(2);
                cell4 = newRow.insertCell(3);
                cell5 = newRow.insertCell(4);

                cell1.classList.add('budget-table-checkbox');
                cell2.classList.add('budget-table-name');
                cell3.classList.add('budget-table-budgeted');
                cell4.classList.add('budget-table-activity');
                cell5.classList.add('budget-table-available');

                cell2.innerHTML = `${name}`;
                cell4.innerHTML = '£0.00';
                cell5.innerHTML = '£0.00';

                let checkboxHtml = `<div class="checkbox-wrapper">
                                    <input type="checkbox" id="category-checkbox">
                                </div>`;
                table.rows[subRow].cells.item(0).insertAdjacentHTML('afterbegin', checkboxHtml);

                let budgetInput = `<div class="input-wrapper">
                                    <input type="text" placeholder="£0.00">
                                 </div>`;
                table.rows[subRow].cells.item(2).insertAdjacentHTML('afterbegin', budgetInput);


                getParentRow.removeAttribute('id');
            }


        },

        clearFields: () => {
            let field;

            field = document.querySelector(DOMstrings.categoryInput);

            // Clear category input field
            field.value = null;

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
        let masterPop, popupPrimary, subPop, overlay, masterToggle;

        popupPrimary = document.getElementById('primary');
        popupPrimary.addEventListener('click', ctrlAddCategory);

        masterToggle = document.querySelectorAll('.arrow-toggle');
        masterToggle.forEach(function (arrow) {
            console.log(arrow);
            arrow.addEventListener('click', function (e) {
                console.log(e.target);
                let children = budgetCtrl.getChildren(e);
                Array.prototype.forEach.call(children, function (e) {
                    e.classList.toggle('toggleDisplay');
                });
            });
        });

        // Add enter button
        overlay = document.querySelector(DOM.overlay);
        document.addEventListener('keypress', function (event) {
            if (event.keycode === 13 && overlay.style.display == 'block' || event.which === 13 && overlay.style.display == 'block') {
                if (UICtrl.getCategoryInput().name !== "") {
                    overlay.style.display = 'none';
                    // document.querySelector(DOM.categoryInput).style.border = '2px solid #88979d';
                    ctrlAddCategory();
                } else {
                    // TODO toggle alert for input field
                    // document.querySelector(DOM.categoryInput).style.border = '2px solid #ff0000';                    
                }
            }
        });

        // sub category add buttons
        subPop = document.querySelectorAll(DOM.addCategory);
        subPop.forEach(function (button) {
            button.addEventListener('click', function () {
                this.parentElement.parentElement.setAttribute('id', 'parent');
                if (popupPrimary.classList.contains('master')) {
                    popupPrimary.classList.remove('master');
                    popupPrimary.classList.add('sub');
                } else {
                    popupPrimary.classList.add('sub');
                }
            });
            button.addEventListener('click', UICtrl.showCategoryPopup);
        });

        // Master category add button
        masterPop = document.querySelector(DOM.mastCategory);
        masterPop.addEventListener('click', function () {
            if (popupPrimary.classList.contains('sub')) {
                popupPrimary.classList.remove('sub');
                popupPrimary.classList.add('master');
            } else {
                popupPrimary.classList.add('master');
            }
        });
        masterPop.addEventListener('click', UICtrl.showCategoryPopup);

    };
    showCategory = () => {

        // 1. Reveal popup
        UICtrl.showCategoryPopup();

    }

    ctrlAddCategory = () => {
        let catType, nameInput, newItem, parent;

        // 1. Get the category type
        catType = document.getElementById('primary');
        if (catType.classList.contains('master')) {
            catType = 'master';

        } else {
            catType = 'sub';
        }
        newItem = budgetCtrl.addItem(catType);

        // 2.Get the input name
        nameInput = UICtrl.getCategoryInput().name;
        if (nameInput !== "") {

            // 3. Add item to UI
            UICtrl.addCategoryItem(newItem, nameInput);

            // 4. Clear Fields
            UICtrl.clearFields();

            // 5. Update event listeners
            setupEventListeners();
        }
    }

    return {
        init: function () {
            setupEventListeners();
        }
    }

})(budgetController, UIController);
controller.init();