/*********************************
 CONFIG
**********************************/

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx5wfL1PypdVQcxdMQiYrNFaOTm5BUnj29C8b8WsrYf3oz9ooq3-h2i6TYJfrT0ZAJdAQ/exec";

/*********************************
 ELEMENTS
**********************************/

const tableBody = document.getElementById("contactsTable");
const alertBox = document.getElementById("alertBox");

/*********************************
 ALERT
**********************************/

function showAlert(msg, type) {

  alertBox.innerHTML = msg;

  alertBox.className =
    "alert-box " +
    (type === "success"
      ? "alert-success"
      : "alert-error");

  alertBox.style.display = "block";

  setTimeout(() => {
    alertBox.style.display = "none";
  }, 4000);
}

/*********************************
 LOAD CONTACTS
**********************************/

async function loadContacts() {

  try {

    const res = await fetch(
      SCRIPT_URL + "?action=getContacts"
    );

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Erreur API:", data);
      return;
    }

    tableBody.innerHTML = "";

    data.forEach(c => {

      console.log(c);

      tableBody.innerHTML += `
        <tr>

          <td>${c.date}</td>
          <td>${c.name}</td>
          <td>${c.email}</td>
          <td>${c.subject}</td>
          <td>${c.message}</td>

          <td>
            <span class="${
              c.status === "lu"
                ? "status-success"
                : "status-pending"
            }">
              ${c.status || "non lu"}
            </span>
          </td>

          <td>

            <button onclick="viewContact('${c.id}')">
              Voir
            </button>

            <button onclick="deleteContact('${c.id}')">
              Supprimer
            </button>

          </td>

        </tr>
      `;
    });

  } catch (e) {
    showAlert("Erreur chargement contacts", "error");
  }
}

/*********************************
 DELETE
**********************************/

async function deleteContact(id) {

  if (!confirm("Supprimer ce message ?")) return;

  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "deleteContact",
      id
    })
  });

  const result = await res.json();

  if (result.success) {
    showAlert("Message supprimé", "success");
    loadContacts();
  }
}

/*********************************
 VIEW + MARK READ
**********************************/

async function viewContact(id) {

  const res = await fetch(
    SCRIPT_URL + "?action=getContactById&id=" + id
  );

  const data = await res.json();

  if (data.success) {

    alert(
      `Nom: ${data.name}
Email: ${data.email}
Sujet: ${data.subject}

Message:
${data.message}`
    );

    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "markAsRead",
        id
      })
    });

    loadContacts();
  }
}

/*********************************
 INIT
**********************************/

loadContacts();