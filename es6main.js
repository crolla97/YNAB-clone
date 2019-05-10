class budgetItem {
  constructor(categoryName, categoryType) {
    this.categoryName = categoryName;
    this.categoryType = categoryType;
  }
}

class UI {
  showCategoryPopup() {
    // X and Y coords
    let x = event.clientX;
    let y = event.clientY;

    // Display Overlay
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'block';
    //Display Popup
    const popup = document.querySelector('.model');
    popup.style.top = `${y + 25}px`;
    popup.style.left = `${x - 115}px`;

    // Focus on form
    document.querySelector('.category-name').focus();

    // Close Popup and Overlay
    document.onclick = function (e) {
      // Remove parent id if category is not added
      let getParentRow = document.getElementById('parent');
      if (e.target.id == 'overlay') {
        overlay.style.display = 'none';
        if (getParentRow === null) {} else {
          getParentRow.removeAttribute('id');
        }
      } else if (e.target.id == 'cancel') {
        overlay.style.display = 'none';
        if (getParentRow === null) {} else {
          getParentRow.removeAttribute('id');
        }
      } else if (e.target.id == 'primary') {
        overlay.style.display = 'none';
      }

      //Instantiate UI
      const ui = new UI;
      // Clear Fields
      ui.clearFields();

    };
  }

  createCategory(item) {
    // Get table
    let table = document.getElementById('budget-table');

    // Get category type
    if (item.categoryType === 'master') {
      console.log('I am a master');
      let newRow = table.insertRow(0);
      newRow.classList.add('budget-table-row');
      newRow.classList.add('master-category');

      // table.rows[0].setAttribute("id", `mast-${item.id}`);

      let cell1 = newRow.insertCell(0),
        cell2 = newRow.insertCell(1),
        cell3 = newRow.insertCell(2),
        cell4 = newRow.insertCell(3),
        cell5 = newRow.insertCell(4)

      cell1.classList.add('budget-table-checkbox');
      cell2.classList.add('budget-table-name');
      cell3.classList.add('budget-table-budgeted');
      cell4.classList.add('budget-table-activity');
      cell5.classList.add('budget-table-available');

      cell2.innerHTML = `${item.categoryName}`;
      cell3.innerHTML = '£0.00';
      cell4.innerHTML = '£0.00';
      cell5.innerHTML = '£0.00';

      let checkboxHtml = `<div class="checkbox-wrapper">
                                  <input type="checkbox" class="category-checkbox">
                              </div>`;
      table.rows[0].cells.item(0).insertAdjacentHTML('afterbegin', checkboxHtml);

      let arrowDown = `<button class="arrow-toggle">
                              <img src="images/caret-down.svg" alt="sort arrow">
                           </button>`;
      table.rows[0].cells.item(1).insertAdjacentHTML('afterbegin', arrowDown);

      let plusHtml = `<button class="add-category inside-add" id="row">
                              <img src="images/plus-sign-in-a-circle.svg" alt="add category">
                          </button>`;
      table.rows[0].cells.item(1).insertAdjacentHTML('beforeend', plusHtml);

    } else if (item.categoryType === 'sub') {
      console.log('I am a sub');
      let getParentRow = document.getElementById('parent');
      let subRow = getParentRow.rowIndex + 1;

      let newRow = table.insertRow(subRow);
      newRow.classList.add('budget-table-row');
      newRow.classList.add('sub-category');

      // table.rows[subRow].setAttribute("id", `sub-${item.id}`);

      let cell1 = newRow.insertCell(0),
        cell2 = newRow.insertCell(1),
        cell3 = newRow.insertCell(2),
        cell4 = newRow.insertCell(3),
        cell5 = newRow.insertCell(4)

      cell1.classList.add('budget-table-checkbox');
      cell2.classList.add('budget-table-name');
      cell3.classList.add('budget-table-budgeted');
      cell4.classList.add('budget-table-activity');
      cell5.classList.add('budget-table-available');

      cell2.innerHTML = `${item.categoryName}`;
      cell4.innerHTML = '£0.00';
      cell5.innerHTML = '£0.00';

      let checkboxHtml = `<div class="checkbox-wrapper">
              <input type="checkbox" class="category-checkbox">
              </div>`;
      table.rows[subRow].cells.item(0).insertAdjacentHTML('afterbegin', checkboxHtml);

      let budgetInput = `<div class="input-wrapper">
              <input type="text" placeholder="£0.00">
              </div>`;
      table.rows[subRow].cells.item(2).insertAdjacentHTML('afterbegin', budgetInput);

      getParentRow.removeAttribute('id');
    }

  }

  deleteCategoryItem() {
    let checkbox = document.querySelectorAll('.category-checkbox');
    checkbox.forEach(function (currentBox) {
      if (currentBox.checked === true) {
        currentBox.parentElement.parentElement.parentElement.remove();
      }
    });
  }

  clearFields() {
    const field = document.querySelector('.category-name');

    // Clear category input field
    field.value = null;
  }
}
/////////////////////
// Event Listeners //
/////////////////////


// Master Category Popup Event
document.getElementById('master').addEventListener('click', () => {
  //Toggle button class to master
  const popupAddButton = document.getElementById('primary');
  if (popupAddButton.classList.contains('sub')) {
    popupAddButton.classList.remove('sub');
    popupAddButton.classList.add('master');
  } else {
    popupAddButton.classList.add('master');
  }
  //Instantiate UI
  const ui = new UI;

  // Show popup
  ui.showCategoryPopup();

});

// Add master category button listener
const addCatBtn = document.getElementById('primary').addEventListener('click', addCategory);

// Sub Category Popup Event
let table = document.getElementById('tbody').addEventListener('click', (e) => {
  let currentBtn = e.target.parentElement;
  if (currentBtn.classList.contains('add-category')) {
    currentBtn = e.target.parentElement.parentElement.parentElement;
    currentBtn.setAttribute('id', 'parent');

    //Toggle button class to sub
    const popupAddButton = document.getElementById('primary');
    if (popupAddButton.classList.contains('master')) {
      popupAddButton.classList.remove('master');
      popupAddButton.classList.add('sub');
    } else {
      popupAddButton.classList.add('sub');
    }

    //Instantiate UI
    const ui = new UI;

    // Show popup
    ui.showCategoryPopup();
  }
});

const deleteBtn = document.querySelector('.delete-button').addEventListener('click', function () {
  //Instantiate UI
  const ui = new UI;
  // Show popup
  ui.deleteCategoryItem();
})

//////////////////
// Add category //
//////////////////

function addCategory() {
  // Get category type
  let type = document.querySelector('.add-btn');
  if (type.classList.contains('master')) {
    type = 'master';
  } else {
    type = 'sub'
  }

  // Get input name
  const categoryName = document.querySelector('.category-name').value

  // Instatiate new budget item
  const rowItem = new budgetItem(categoryName, type);
  // Instatiate UI
  const ui = new UI();
  // Add category to UI
  ui.createCategory(rowItem);
  // Clear field
  ui.clearFields();

}