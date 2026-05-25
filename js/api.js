const url = "https://graph.facebook.com/v19.0/PAGE_ID/posts?access_token=TOKEN";

fetch(url)
  .then(res => res.json())
  .then(data => {
      const container = document.getElementById("posts");
      container.innerHTML = "";

      data.data.forEach(post => {
          const div = document.createElement("div");
          div.classList.add("post");

          div.innerHTML = `
              <p>${post.message ? post.message : "Publication sans texte"}</p>
              <small>${new Date(post.created_time).toLocaleString()}</small>
          `;

          container.appendChild(div);
      });
  })
  .catch(err => console.error("Erreur API Facebook :", err));