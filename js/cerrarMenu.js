// CERRAR MODAL
function hideModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.hidden = true;
}




//INPUTS
//VENTANA PROGRAMA

const dropdownButton = document.getElementById("dropdownDefaultButton");
const dropdownOptions = document.querySelectorAll("#dropdown a[data-value]");

// Agregar evento de clic a las opciones
dropdownOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedValue = e.target.getAttribute("data-value");
    dropdownButton.textContent = selectedValue;
  });
});



//VENTANA MODULO
const dropdownButton1 = document.getElementById('dropdownUsersButton');
const dropdownOptions1 = document.querySelectorAll('#dropdownUsers a[data-value]');

// Agregar evento de clic a las opciones
dropdownOptions1.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedValue = e.target.getAttribute('data-value');
        dropdownButton1.textContent = selectedValue;
    });
});


//VENTANA PARENTESCO
const dropdownButton2 = document.getElementById('dropdownDefaultButton2');
const dropdownOptions2 = document.querySelectorAll('#parentesco a[data-value]');

// Agregar evento de clic a las opciones
dropdownOptions2.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedValue = e.target.getAttribute('data-value');
        dropdownButton2.textContent = selectedValue;
    });
});










