async function loadData(){
  const res = await fetch("https://script.google.com/macros/s/AKfycbwu-jQ_LJdltLMd-UpupReB4lbwmQ-hPOLSNL3cjekjIIDufWho3JmR0noWz6Fda-D3YQ/exec");
  const data = await res.json();

  const table = document.getElementById("data");
  table.innerHTML = "";

  data.forEach(user => {
    table.innerHTML += `
      <tr>
        <td>${user.email}</td>
        <td>${user.date}</td>
        <td><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>
      </tr>
    `;
  });

  document.getElementById("totalSubscribers").textContent = data.length;
}

loadData();

const search =
document.querySelector(".search-input");

search.addEventListener("keyup", ()=>{

    const value =
    search.value.toLowerCase();

    const rows =
    document.querySelectorAll(
    "#data tr"
    );

    rows.forEach(row=>{

        row.style.display =
        row.innerText
        .toLowerCase()
        .includes(value)
        ? ""
        : "none";

    });

});


document
.querySelector(".export-btn")
.addEventListener("click",()=>{

    let csv =
    "Email,Date\n";

    document
    .querySelectorAll(
    "#data tr"
    )
    .forEach(row=>{

        let cols =
        row.querySelectorAll("td");

        if(cols.length){

            csv +=
            [
                cols[0].innerText,
                cols[1].innerText
            ].join(",") + "\n";

        }

    });

    const blob =
    new Blob(
    [csv],
    {type:"text/csv"}
    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "abonnes.csv";

    link.click();

});
