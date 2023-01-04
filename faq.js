let buttons = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// const search = () =>{
//   const searchbox = document.getElementById("search-item").nodeValue.toUpperCase();
//   const storeitems = document.getElementsByClassName("accordion")
//   const product = document.querySelectorAll(".product")
//   const pname = document.
// }