document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------
       Mobile Menu Toggle
    --------------------------- */

    const menuBtn = document.querySelector(".cyber-menu-btn");
    const navLinks = document.querySelector(".cyber-nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    }

    /* ---------------------------
       Event Filtering
    --------------------------- */

    const filterBtns = document.querySelectorAll(".filter-btn");
    const eventCards = document.querySelectorAll(".event-card");

    if (filterBtns.length > 0) {

        filterBtns.forEach(btn => {

            btn.addEventListener("click", () => {

                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.dataset.filter;

                eventCards.forEach(card => {

                    const category = card.dataset.category;

                    if (filter === "all" || category === filter) {
                        card.style.display = "flex";
                    } else {
                        card.style.display = "none";
                    }

                });

            });

        });

    }

});


/* ---------------------------
   Modal Functions
--------------------------- */

const modal = document.getElementById("eventModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

function openModal(title, content) {

    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

}

function closeModal() {

    modal.classList.remove("active");
    document.body.style.overflow = "";

}

function closeModalOnOutsideClick(e) {

    if (e.target.classList.contains("modal-overlay")) {
        closeModal();
    }

}
document.addEventListener("DOMContentLoaded", () => {
    const lbBody = document.getElementById("lbBody");
    const lbSearch = document.getElementById("lbSearch");
    const lbSortBtn = document.getElementById("lbSortBtn");

    if (!lbBody) return; // only run on leaderboard page

    let sortDesc = true;

    function renderLeaderboard() {
        const query = (lbSearch?.value || "").toLowerCase().trim();

        let list = [...members];

        if (query) {
            list = list.filter(m => m.name.toLowerCase().includes(query));
        }

        list.sort((a, b) => sortDesc ? b.points - a.points : a.points - b.points);

        lbBody.innerHTML = "";

        list.forEach((m, idx) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td><span class="rank-pill">#${idx + 1}</span></td>
        <td>${m.name}</td>
        <td>${m.points}</td>
        <td><span class="badge">${m.badge}</span></td>
      `;
            lbBody.appendChild(tr);
        });
    }

    lbSearch?.addEventListener("input", renderLeaderboard);

    lbSortBtn?.addEventListener("click", () => {
        sortDesc = !sortDesc;
        lbSortBtn.textContent = sortDesc ? "Sort: High → Low" : "Sort: Low → High";
        renderLeaderboard();
    });

    renderLeaderboard();
});
// PROFILE PAGE

document.addEventListener("DOMContentLoaded", () => {

    const list = document.getElementById("memberList");
    const name = document.getElementById("pName");

    if (!list) return;

    function showProfile(member) {

        document.getElementById("pName").textContent = member.name;
        document.getElementById("pBio").textContent = member.bio;
        document.getElementById("pPoints").textContent = member.points;
        document.getElementById("pBadge").textContent = member.badge;

        const skillsBox = document.getElementById("pSkills");
        skillsBox.innerHTML = "";

        member.skills.forEach(skill => {
            const tag = document.createElement("span");
            tag.textContent = skill;
            skillsBox.appendChild(tag);
        });

        document.getElementById("pGithub").href = member.github;
        document.getElementById("pLinkedin").href = member.linkedin;

    }

    members.forEach(m => {

        const div = document.createElement("div");
        div.className = "member-item";
        div.textContent = m.name;
        div.onclick = () => {
            document.querySelectorAll(".member-item").forEach(i => i.classList.remove("active"));
            div.classList.add("active");
            showProfile(m);
        };

        list.appendChild(div);

    });

    showProfile(members[0]);

});