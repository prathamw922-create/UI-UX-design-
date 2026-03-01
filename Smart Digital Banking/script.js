function login() {
    window.location.href = "dashboard.html";
}

function showSection(sectionId, event) {

    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");

    document.querySelectorAll(".sidebar li").forEach(item => {
        item.classList.remove("active");
    });

    event.target.classList.add("active");
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("collapsed");
}

function transfer() {
    let name = document.getElementById("recipient").value;
    let amount = document.getElementById("amount").value;

    if(name === "" || amount === ""){
        alert("Please fill all details!");
    } else {
        alert("₹" + amount + " transferred to " + name + " successfully!");
    }
}

/* Chart */
window.onload = function () {

    // Hide Loader
    let loader = document.getElementById("loader");
    if(loader){
        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    }

    const ctx = document.getElementById('myChart');
    if(ctx){
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Shopping', 'Recharge', 'Food'],
                datasets: [{
                    data: [2000, 500, 1500],
                    backgroundColor: [
                        '#00c6ff',
                        '#ff4b2b',
                        '#00ff99'
                    ]
                }]
            }
        });
    }
}
