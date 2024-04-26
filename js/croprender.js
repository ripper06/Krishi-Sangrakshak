
const form = document.querySelector('[data-form]');
const lists = document.querySelector('[data-lists]');
const input = document.querySelector('[data-input]');

// local Storage
class Storage {
  static addToStorage(foodContArr) {
    const storage = localStorage.setItem('food', JSON.stringify(foodContArr));
    return storage;
  }

  static getStorage() {
    const storage = localStorage.getItem('food') === null
      ? [] : JSON.parse(localStorage.getItem('food'));
    return storage;
  }
}

// array
let foodContArr = Storage.getStorage();

// display the food in the DOM
class UI {
  static displayData() {
    const displayData = foodContArr.map((item) => `
                  <div class="food">
                      <h3>${item.food}</h3>

                      <span class="remove" data-id = ${item.id} ><small>remove item</small></span>
                  </div>
              
              
              `);
    lists.innerHTML = (displayData).join(' ');
  }

  static clearInput() {
    input.value = '';
  }

  static removeFood() {
    lists.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
      }
      const btnId = e.target.dataset.id;
      // remove from array.
      UI.removeArrayFood(btnId);
    });
  }

  static removeArrayFood(id) {
    foodContArr = foodContArr.filter((item) => item.id !== +id);
    Storage.addToStorage(foodContArr);
  }
}

// form part
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = Math.random() * 1000000;

  const food = new Food(id, input.value);
  foodContArr = [...foodContArr, food];
  UI.displayData();
  Storage.addToStorage(foodContArr);
  UI.clearInput();
  UI.removeFood();
});

// make object instance
class Food {
  constructor(id, food) {
    this.id = id;
    this.food = food;
  }
}

// once the browser is loaded
window.addEventListener('DOMContentLoaded', () => {
  UI.displayData();
  // remove from the dom
  UI.removeFood();
});