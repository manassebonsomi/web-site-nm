const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzrUYIb0zcWh5gNJf9qq7HYmHVO6h8y6QGjtXasMn1EklWjLyM5t_bnVgnRow0r1Hlzxg/exec";

/****************************
 ELEMENTS
****************************/

const form = document.getElementById("newsletterForm");
const subject = document.getElementById("subject");
const category = document.getElementById("category");
const image = document.getElementById("image");
const message = document.getElementById("message");

const preview = document.getElementById("newsletterPreview");
const historyTable = document.getElementById("historyTable");

const progressContainer = document.getElementById("progressContainer");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const alertBox = document.getElementById("alertBox");

/****************************
 CLOUDINARY UPLOAD
****************************/

async function uploadToCloudinary(file) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "bmm_prod_signed_upload");

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/doepcl1iu/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await res.json();
    return data.secure_url;
}

/****************************
 PREVIEW
****************************/

function updatePreview() {

    preview.innerHTML = `
        <h2>${subject.value || "Titre"}</h2>
        <span>${category.value}</span>
        <div id="imgPrev"></div>
        <p>${message.value || ""}</p>
    `;

    const container = document.getElementById("imgPrev");

    if (image.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
            container.innerHTML = `<img src="${e.target.result}" style="width:100%">`;
        };
        reader.readAsDataURL(image.files[0]);
    }
}

subject.oninput = updatePreview;
message.oninput = updatePreview;
category.onchange = updatePreview;

/****************************
 ALERT
****************************/

function showAlert(msg, type) {

    if (!alertBox) return;

    alertBox.innerHTML = msg;
    alertBox.className = "alert-box " + type;
    alertBox.style.display = "block";

    setTimeout(() => alertBox.style.display = "none", 4000);
}

/****************************
 PROGRESS
****************************/

function updateProgress(p, text) {

    progressContainer.style.display = "block";
    progressFill.style.width = p + "%";
    progressText.innerText = text;
}

/****************************
 SUBMIT
****************************/

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        updateProgress(10, "Préparation...");

        let imageUrl = "";

        if (image.files[0]) {
            updateProgress(40, "Upload image Cloudinary...");
            imageUrl = await uploadToCloudinary(image.files[0]);
        }

        updateProgress(70, "Envoi newsletter...");

        const payload = {
            action: "sendNewsletter",
            subject: subject.value,
            category: category.value,
            message: message.value,
            image: imageUrl
        };

        console.log(payload);

        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify(payload)
        });

        const text = await res.text();
        console.log("RAW:", text);

        const result = JSON.parse(text);

        updateProgress(100, "Terminé");

        if (result.success) {

            showAlert(`Envoyée à ${result.recipients} abonnés`, "success");

            form.reset();
            preview.innerHTML = "Aperçu...";

            loadHistory();

        } else {
            throw new Error(result.message);
        }

    } catch (err) {
        showAlert(err.message, "error");
    }
});

/****************************
 HISTORY
****************************/
/* 
async function loadHistory() {

    const res = await fetch(SCRIPT_URL + "?action=history");
    const data = await res.json();

    if (!Array.isArray(data)) {
        console.error("History invalid:", data);
        return;
    }

    historyTable.innerHTML = "";

    data.forEach(item => {
        historyTable.innerHTML += `
        <tr>
            <td>${item.date}</td>
            <td>${item.subject}</td>
            <td>${item.recipients}</td>
            <td>Envoyée</td>
        </tr>`;
    });
} */

async function loadHistory() {

    try {

        const res = await fetch(
            SCRIPT_URL + "?action=history"
        );

        const data = await res.json();

        if(data.length === 0){

        historyTable.innerHTML = `
            <tr>
                <td colspan="4" style="
                    text-align:center;
                    padding:40px;
                    color:#9ca3af;
                ">
                    Aucune newsletter envoyée pour le moment.
                </td>
            </tr>
        `;

        return;
        }

        console.log("HISTORY DATA :", data);
        console.log("TYPE :", typeof data);
        console.log("IS ARRAY :", Array.isArray(data));

        historyTable.innerHTML = "";

        if (!Array.isArray(data)) {

            console.error(
                "Le serveur ne retourne pas un tableau :",
                data
            );

            return;
        }

        data.forEach(item => {

            historyTable.innerHTML += `
            <tr>
                <td>${item.date}</td>
                <td>${item.subject}</td>
                <td>${item.recipients}</td>
                <td>
                    <span class="status-success">
                        Envoyée
                    </span>
                </td>
            </tr>
            `;
        });

    } catch(error) {

        console.error(
            "Erreur loadHistory :",
            error
        );
    }
}

loadHistory();