//* Budget Controller
let budgetController = (function () {

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

        getCategoryType: function () {



        },

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

        addCategoryItem: (type, name) => {
            let table, element, newRow, cell1, cell2, cell3, cell4, cell5;
        
            // TODO 1. get category type, master or row
            // console.log('im working here');
            table = document.getElementById('budget-table');
            if (type === 'master') {
                console.log('I am a master');
                newRow = table.insertRow(0);

                // newRow = `<tr class="budget-table-row master-category">
                //             <td class="budget-table-checkbox">
                //                 <div class="checkbox-wrapper">
                //                     <input type="checkbox" id="category-checkbox">
                //                 </div>
                //             </td>
                //             <td class="budget-table-name">
                //                 Immediate Obligations
                //                 <button class="add-category inside-add" id="row">
                //                     <img src="/images/plus-sign-in-a-circle.svg" alt="add category">
                //                 </button>
                //             </td>
                //             <td class="budget-table-budgeted">
                //                 £0.00
                //             </td>
                //             <td class="budget-table-activity">
                //                 £0.00
                //             </td>
                //             <td class="budget-table-available">
                //                 £0.00
                //             </td>
                //         </tr>`;

                newRow.classList.add('budget-table-row');
                newRow.classList.add('master-category');

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



            } else if ( type=== 'sub') {
                console.log('I am a sub')
            }
            // TODO 2. create HTML string with placeholder text

            let tableRef = document.querySelector('.budget-table')




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
        let masterPop, popupPrimary, subPop, catName;

        popupPrimary = document.getElementById('primary');
        popupPrimary.addEventListener('click', ctrlAddCategory);

        // sub category add buttons
        subPop = document.querySelectorAll(DOM.addCategory);
        subPop.forEach(function (button) {
            button.addEventListener('click', function () {
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
        let catType, nameInput;

        
        catType = document.getElementById('primary');
        if (catType.classList.contains('master')) {
            catType = 'master';
        }   else {
            catType = 'sub';
        }

        nameInput = UICtrl.getCategoryInput();



        if (nameInput.name !== "") {
            UICtrl.addCategoryItem(catType, nameInput.name);
        }
    }

    return {
        init: function () {
            setupEventListeners();
        }
    }

})(budgetController, UIController);
controller.init();