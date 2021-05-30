const username_field = document.querySelector("#username_field");
username_field.addEventListener("change", (event) => {
  let username = event.target.value;
  const submitButton = document.querySelector("#input_submit");
  submitButton.addEventListener("click", () => {
    localStorage.setItem("username", username);
  });
});
