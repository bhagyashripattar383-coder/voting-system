// Store votes
let votes = JSON.parse(localStorage.getItem("votes")) || {
    BJP: 0,
    INC: 0,
    AAP: 0,
    CPI: 0
};

let votedUsers = JSON.parse(localStorage.getItem("votedUsers")) || [];

// Step 1: Go to vote page
function goToVote() {
    let voterId = document.getElementById("voterId").value;

    if (voterId === "") {
        alert("Enter Voter ID");
        return;
    }

    localStorage.setItem("currentVoter", voterId);
    window.location.href = "vote.html";
}

// Step 2: Submit vote
function submitVote() {
    let voterId = localStorage.getItem("currentVoter");
    let selected = document.querySelector('input[name="vote"]:checked');

    if (votedUsers.includes(voterId)) {
        document.getElementById("message").innerText = "❌ Already voted!";
        return;
    }

    if (!selected) {
        document.getElementById("message").innerText = "❌ Select candidate!";
        return;
    }

    let party = selected.value;
    votes[party]++;
    votedUsers.push(voterId);

    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("votedUsers", JSON.stringify(votedUsers));

    document.getElementById("message").innerText = "✅ Vote submitted!";
}

// Step 3: Admin Login
function adminLogin() {
    let user = document.getElementById("adminUser").value;
    let pass = document.getElementById("adminPass").value;

    if (user === "admin" && pass === "1234") {
        window.location.href = "result.html";
    } else {
        document.getElementById("loginMsg").innerText = "❌ Invalid login!";
    }
}

// Step 4: Show Results
if (window.location.pathname.includes("result.html")) {
    let resultHTML = "";

    for (let party in votes) {
        resultHTML += `${party}: ${votes[party]} votes<br>`;
    }

    document.getElementById("results").innerHTML = resultHTML;
}