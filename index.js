function checkAgeValidity() {
    const dobElement = document.getElementById("userDob");
    const dobValue = dobElement.value;
    const dobDate = new Date(dobValue);

    const today = new Date();
    const month = dobDate.getMonth();
    const day = dobDate.getDate();
    let age = today.getFullYear() - dobDate.getFullYear();

    let checkmonth = today.getMonth() < month;
    let checkday = today.getMonth() === month && today.getDate() < day;

    if (checkmonth || checkday) {
        age--;
    }

    const isValidAge = age > 18 && age < 55;

    if (!isValidAge) {
        dobElement.setCustomValidity("The age should be between 18 and 55 years");
        dobElement.reportValidity();
    } else {
        dobElement.setCustomValidity("");
    }
}

const EntriesRetrieved = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userentries = EntriesRetrieved();

const displayEntries = () => {
    const entries = EntriesRetrieved();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full"><tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">Dob</th>
        <th class="px-4 py-2">Accepted terms?</th>
    </tr>${tableEntries} </table>`;
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const saveUserform = (event) => {
    event.preventDefault();

    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const dob = document.getElementById('userDob').value;
    const acceptedTermsAndConditions = document.getElementById('acceptTerms').checked;

    if (!isValidEmail(email)) {
        alert("Invalid email address");
        return;
    }

    checkAgeValidity();

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions
    };
    userentries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userentries));
    displayEntries();
}

let userform = document.getElementById("user-form");
userform.addEventListener("submit", saveUserform);
displayEntries();
