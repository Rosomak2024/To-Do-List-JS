const olParrentElement = document.querySelector("ol");
const addButton = document.querySelector(".btn");
const editButton = document.querySelector(".btn_1");
const deleteButton = document.querySelector(".btn_2");
const textInput = document.getElementById("text-input");
const tasks = [];
document.querySelectorAll("input[type='checkbox']");
resetButtonState();

document.addEventListener("keyup", function (event) {
  const isEventInTextInput = event.target === textInput;

  if (isEventInTextInput) {
    handleTextInput(event.target.value); // event
  }
});

document.addEventListener("click", function (event) {
  const isEventOnButton =
    event.target === addButton ||
    event.target === deleteButton ||
    event.target === editButton;
  const isEventOnCheckbox = event.target.type === "checkbox";

  if (isEventOnButton) {
    handleButton(event);
  } else if (isEventOnCheckbox) {
    handleCheckbox(event);
  }
});

function handleButton(event) {
  if (event.target == addButton) {
    addTaskToList();
  } else if (event.target == deleteButton) {
    deleteTaskFromList();
  } else if (event.target == editButton) {
    editTask();
  }
}

function handleCheckbox() {
  const checkboxInputs = document.querySelectorAll("input[type='checkbox']");

  const checkedCheckboxes = [...checkboxInputs].filter(
    (checkboxInput) => checkboxInput.checked
  );

  if (checkedCheckboxes.length === 0) {
    resetButtonState();
  } else if (checkedCheckboxes.length === 1) {
    resetButtonStateWhenEdit();
  } else {
    addButton.disabled = true;
    editButton.disabled = true;
    deleteButton.disabled = false;
  }
}

function handleTextInput(value) {
  console.log("handletextinut", value);

  if (textInput !== "") {
    console.log("Input not empty");
  } else {
    resetButtonStateWhenEdit();
    console.log("Input empty");
  }
}

function resetButtonState() {
  addButton.disabled = false;
  editButton.disabled = true;
  deleteButton.disabled = true;
}

function resetButtonStateWhenEdit() {
  addButton.disabled = true;
  editButton.disabled = false;
  deleteButton.disabled = false;
}

function resetTextInputState() {
  textInput.value = "";
}

function addTaskToList() {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  olParrentElement.appendChild(li);
  olParrentElement.appendChild(checkbox);
  li.setAttribute("id", `list_Element_${tasks.length}`);
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", `checkbox_Element_${tasks.length}`);
  li.innerText = textInput.value;
  tasks.push(li);
  resetTextInputState();
}

function deleteTaskFromList() {
  const checkedCheckbox = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );

  checkedCheckbox.forEach((element) => {
    olParrentElement.removeChild(element.previousSibling);
    olParrentElement.removeChild(element);
  });
  resetButtonState();
}

function editTask() {
  const checkedCheckbox_toEdit = document.querySelector(
    "input[type='checkbox']:checked"
  );

  checkedCheckbox_toEdit.previousElementSibling.innerText = textInput.value;
  resetTextInputState();
}
