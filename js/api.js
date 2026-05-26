const PAGE_ID = "1081416121727597";
const TOKEN = "EAANNs06bE3EBRp9J1sZAGmxF29ZBmpqnckRMCp8055FxqxOj4u6stEv6GmBvnRlvEDS147HSibJUtZBUbm5ZAYMFLRzRwEn8EVOIZAh1ZBnscn3aDTIAyZB0Y9PZAefVbKZCt8vZAQXLW0usqLlHhQwMi4rsWg2U3wWH0Bu5nbovfVZCZC7uXWff1ggBgZAzDZBztIfR2rO5dZAIz4sZBdlu7uLoEPNSxJyv1PBtmj8ZBWAIhlONYl2CvDuNQUsGhdLtInpFxKSCgxVlIX3n8HL3WTtRETqEs";

const url = `https://graph.facebook.com/v19.0/${PAGE_ID}/posts?access_token=${TOKEN}`;

async function loadPosts() {
    try {
        const res = await fetch(url);
        const data = await res.json();

        const container = document.getElementById("posts");
        container.innerHTML = "";

        data.data.forEach(post => {
            const div = document.createElement("div");
            div.className = "post";

            div.innerHTML = `
                <p>${post.message || "Publication sans texte"}</p>
                <small>${new Date(post.created_time).toLocaleString()}</small>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Erreur :", error);
    }
}

loadPosts();