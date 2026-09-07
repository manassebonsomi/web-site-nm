document.getElementById("newsletter-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("newsletter-email");
    const message = document.getElementById("newsletter-message");

    const email = emailInput.value.trim();

    if (!email || !email.includes("@")) {
        message.innerHTML = "❌ Veuillez saisir une adresse email valide.";
        return;
    }

    if (!email || email.length < 5 || !email.includes("@")) {
    message.innerHTML = "❌ Email invalide.";
    return;
    } 

    message.innerHTML = "⏳ Inscription en cours...";

    const url = "https://script.google.com/macros/s/AKfycbwu-jQ_LJdltLMd-UpupReB4lbwmQ-hPOLSNL3cjekjIIDufWho3JmR0noWz6Fda-D3YQ/exec";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                email: email
            })
        });

        const result = await response.text();

        if (result.trim() === "OK") {
            message.innerHTML = "✅ Inscription réussie !";
            document.getElementById("newsletter-form").reset();
        } else {
            console.error("Réponse Apps Script :", result);
            message.innerHTML = "❌ Erreur lors de l'inscription.";
        }

    } catch (error) {
        console.error("Erreur Fetch :", error);
        message.innerHTML = "❌ Impossible de contacter le serveur.";
    }
});


// CONTACT SYSTEM (GOOGLE SHEETS)

document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameInput = document.getElementById("nom");
    const subjectInput = document.getElementById("sujet");
    const message = document.getElementById("contact-message");


    const email = emailInput.value.trim();

    if (!email || !email.includes("@")) {
        message.innerHTML = "❌ Veuillez saisir une adresse email valide.";
        return;
    }

    if (!email || email.length < 5 || email.indexOf("@") === -1) {
      return ContentService.createTextOutput("INVALID");
    }

    message.innerHTML = "⏳ Envoi du message...";

    const url = "https://script.google.com/macros/s/AKfycbzSTLfFv99bf-hxtpmKghz6vBcFxjg3jY-CIRfSFxTOo8j1aYs2r4snv2e_v4D9vGVj8w/exec";

    try {
            const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                email: email,
                nom: nameInput.value,
                sujet: subjectInput.value,
                message: messageInput.value
            })
        });

        const result = await response.text();

        console.log("Status de la réponse :", response.status);
        console.log("Headers de la réponse :", response.headers);
        console.log("Corps de la réponse :", result);


        if (result.trim() === "OK") {
            message.innerHTML = "✅ Message envoyé !";
            document.getElementById("contactForm").reset();
        } else {
            console.error("Réponse Apps Script :", result);
            message.innerHTML = "❌ Erreur lors de l'envoi du message.";
        }

    } catch (error) {
        console.error("Erreur Fetch :", error);
        message.innerHTML = "❌ Impossible de contacter le serveur.";
    }
}); 