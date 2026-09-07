/*********************************
 CONFIGURATION
**********************************/

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzeqM1HMlNLPBEpWZM5WnJ57fR0XZmD48w8OeryKCcpOgqiV_EDJwqr1XeMJOAJGguPpQ/exec";

const CLOUD_NAME = "doepcl1iu";
const UPLOAD_PRESET = "bmm_prod_signed_upload";

/*********************************
 ELEMENTS
**********************************/

const form = document.getElementById("newsForm");

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const imageInput = document.getElementById("image");
const contentInput = document.getElementById("content");

const previewBtn = document.getElementById("previewBtn");
const preview = document.getElementById("newsPreview");

const historyTable = document.getElementById("historyTable");

const progressContainer =
document.getElementById("progressContainer");

const progressFill =
document.getElementById("progressFill");

const progressText =
document.getElementById("progressText");

const alertBox =
document.getElementById("alertBox");

/*********************************
 MODE EDITION
**********************************/

let editingId = null;

/*********************************
 ALERTES
**********************************/

function showAlert(message, type) {

    if (!alertBox) return;

    alertBox.innerHTML = message;

    alertBox.className =
        "alert-box " +
        (type === "success"
            ? "alert-success"
            : "alert-error");

    alertBox.style.display = "block";

    setTimeout(() => {

        alertBox.style.display = "none";

    }, 5000);
}

/*********************************
 PROGRESSION
**********************************/

function updateProgress(percent, text) {

    progressContainer.style.display = "block";

    progressFill.style.width =
        percent + "%";

    progressText.innerHTML = text;
}

function resetProgress() {

    setTimeout(() => {

        progressContainer.style.display =
            "none";

        progressFill.style.width = "0%";

    }, 2000);
}

/*********************************
 CLOUDINARY
**********************************/

async function uploadToCloudinary(file) {

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
        "upload_preset",
        UPLOAD_PRESET
    );

    const response = await fetch(

        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

        {
            method: "POST",
            body: formData
        }
    );

    const result =
        await response.json();

    if (!result.secure_url) {

        throw new Error(
            "Erreur upload Cloudinary"
        );
    }

    return result.secure_url;
}

/*********************************
 APERCU
**********************************/

function updatePreview() {

    preview.innerHTML = `
        <div>

            <div class="preview-category">
                ${categoryInput.value}
            </div>

            <h2 class="preview-title">
                ${titleInput.value || "Titre de l'actualité"}
            </h2>

            <div id="previewImage"></div>

            <div class="preview-content">
                ${(contentInput.value || "Contenu de l'article...")
                    .replace(/\n/g, "<br>")}
            </div>

        </div>
    `;

    displayImagePreview();
}

titleInput.addEventListener(
    "input",
    updatePreview
);

categoryInput.addEventListener(
    "change",
    updatePreview
);

contentInput.addEventListener(
    "input",
    updatePreview
);

previewBtn.addEventListener(
    "click",
    updatePreview
);

/*********************************
 IMAGE PREVIEW
**********************************/

function displayImagePreview() {

    const container =
        document.getElementById(
            "previewImage"
        );

    if (!container) return;

    if (!imageInput.files[0]) {

        container.innerHTML = "";
        return;
    }

    const reader =
        new FileReader();

    reader.onload = function (e) {

        container.innerHTML = `
            <img
                src="${e.target.result}"
                style="
                    width:100%;
                    border-radius:15px;
                    margin-top:20px;
                "
            >
        `;
    };

    reader.readAsDataURL(
        imageInput.files[0]
    );
}

imageInput.addEventListener(
    "change",
    displayImagePreview
);

/*********************************
 ENREGISTREMENT
**********************************/

form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        try {

            updateProgress(
                10,
                "Préparation..."
            );

            let imageUrl = "";

            if (imageInput.files[0]) {

                updateProgress(
                    30,
                    "Upload image..."
                );

                imageUrl =
                    await uploadToCloudinary(
                        imageInput.files[0]
                    );
            }

            updateProgress(
                70,
                "Publication..."
            );

            const payload = {

                action:
                    editingId
                        ? "updateNews"
                        : "createNews",

                id: editingId,

                title:
                    titleInput.value,

                category:
                    categoryInput.value,

                content:
                    contentInput.value,

                image:
                    imageUrl
            };

            console.log(payload);

            const response =
                await fetch(
                    SCRIPT_URL,
                    {
                        method: "POST",
                        body: JSON.stringify(
                            payload
                        )
                    }
                );

            const text =
                await response.text();

            console.log(
                "RAW:",
                text
            );

            const result =
                JSON.parse(text);

            if (!result.success) {

                throw new Error(
                    result.message
                );
            }

            updateProgress(
                100,
                "Terminé"
            );

            showAlert(

                editingId
                    ? "Actualité modifiée avec succès."
                    : "Actualité publiée avec succès.",

                "success"
            );

            editingId = null;

            form.reset();

            updatePreview();

            loadNewsHistory();

            resetProgress();

        } catch (error) {

            console.error(error);

            showAlert(
                error.message,
                "error"
            );

            resetProgress();
        }
    }
);

/*********************************
 HISTORIQUE
**********************************/

async function loadNewsHistory() {

    try {

        const response =
            await fetch(
                SCRIPT_URL +
                "?action=getNews"
            );

        const data =
            await response.json();

        console.log(data);

        if (!Array.isArray(data)) {

            console.error(
                "Format invalide :",
                data
            );

            return;
        }

        historyTable.innerHTML = "";

        data.forEach(news => {

            historyTable.innerHTML += `
            <tr>

                <td>${news.date}</td>

                <td>${news.title}</td>

                <td>${news.category}</td>

                <td>
                    <span class="status-success">
                        Publié
                    </span>
                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="edit-btn"
                            onclick="editNews('${news.id}')">

                            <i class="fa-solid fa-pen"></i>

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteNews('${news.id}')">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>
            `;
        });

    } catch (error) {

        console.error(error);

        showAlert(
            "Erreur chargement historique",
            "error"
        );
    }
}

/*********************************
 SUPPRESSION
**********************************/

async function deleteNews(id) {

    if (!confirm(
        "Supprimer cette actualité ?"
    )) return;

    const response =
        await fetch(
            SCRIPT_URL,
            {
                method: "POST",

                body: JSON.stringify({

                    action:
                        "deleteNews",

                    id
                })
            }
        );

    const result =
        await response.json();

    if (result.success) {

        showAlert(
            "Actualité supprimée",
            "success"
        );

        loadNewsHistory();
    }
}

/*********************************
 MODIFICATION
**********************************/

async function editNews(id) {

    const response =
        await fetch(
            `${SCRIPT_URL}?action=getNewsById&id=${id}`
        );

    const news =
        await response.json();

    editingId =
        news.id;

    titleInput.value =
        news.title;

    categoryInput.value =
        news.category;

    contentInput.value =
        news.content;

    updatePreview();

    window.scrollTo({

        top: 0,
        behavior: "smooth"
    });

    showAlert(
        "Mode modification activé",
        "success"
    );
}

/*********************************
 INITIALISATION
**********************************/

updatePreview();

loadNewsHistory();