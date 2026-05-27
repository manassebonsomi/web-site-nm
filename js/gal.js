/* =========================
   GALLERY FILTER SYSTEM
========================= */

document.addEventListener("DOMContentLoaded", () => {

  // BUTTONS
  const filterButtons = document.querySelectorAll(".filter");

  // ITEMS
  const galleryItems = document.querySelectorAll(".gal-item");

  // CHECK
  if(filterButtons.length === 0 || galleryItems.length === 0){
    return;
  }

  // FILTER CLICK
  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      // REMOVE ACTIVE
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      // ADD ACTIVE
      button.classList.add("active");

      // GET FILTER
      const filterValue = button.getAttribute("data-filter");

      // LOOP ITEMS
      galleryItems.forEach(item => {

        // SHOW ALL
        if(filterValue === "all"){

          item.style.display = "block";

          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 100);

        }else{

          // MATCH
          if(item.classList.contains(filterValue)){

            item.style.display = "block";

            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 100);

          }else{

            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";

            setTimeout(() => {
              item.style.display = "none";
            }, 300);

          }

        }

      });

    });

  });

});