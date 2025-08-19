// app.js
import { student } from "./data.js"; // import student data

// --- Helpers ---
const $ = (sel) => document.querySelector(sel);
const out = $("#output");
const log = (msg, obj) => {
  if (obj !== undefined) {
    out.textContent = `${msg}\n` + JSON.stringify(obj, null, 2);
  } else {
    out.textContent = String(msg);
  }
};

function renderProfile(s){
  $("#v-name").textContent = s.name;
  $("#v-id").textContent = s.id;
  $("#v-age").textContent = s.age;
  $("#v-address").textContent = s.address;
  $("#v-married").textContent = s.isMarried ? "Married ✅" : "Unmarried ❌";

  const friendsEl = $("#friends");
  friendsEl.innerHTML = "";
  s.friends.forEach((f, i) => {
    const span = document.createElement("span");
    span.className = "pill";
    span.textContent = `${i+1}. ${f}`;
    friendsEl.appendChild(span);
  });

  const moviesEl = $("#movies");
  moviesEl.innerHTML = "";
  s.movies.forEach((m, i) => {
    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `
      <h4>${i+1}. ${m.name}</h4>
      <div class="row">
        <span class="pill">Actor: ${m.actor}</span>
        <span class="pill">Actress: ${m.actress}</span>
      </div>
    `;
    moviesEl.appendChild(div);
  });
}

// --- Button Actions ---
$("#btn-bestfriend").addEventListener("click", () => {
  const hobby = student?.bestFriend?.details?.hobby ?? "Not available";
  log("Best friend’s hobby:", { hobby });
});

$("#btn-second-actress").addEventListener("click", () => {
  const actress = student?.movies?.[1]?.actress ?? "Not available";
  log("Actress of 2nd movie:", { actress });
});

$("#btn-first-movie").addEventListener("click", () => {
  const first = student?.movies?.[0] ?? null;
  log("First movie full object:", first);
});

$("#btn-count").addEventListener("click", () => {
  const count = student?.friends?.length ?? 0;
  log(`Shahin has ${count} friend(s).`);
});

$("#btn-profile").addEventListener("click", () => {
  const profile = {
    basic: {
      name: student.name,
      id: student.id,
      age: student.age,
      city: student.address,
      marital: student.isMarried ? "Married" : "Unmarried"
    },
    bestFriend: {
      name: student?.bestFriend?.name,
      age: student?.bestFriend?.details?.age,
      hobby: student?.bestFriend?.details?.hobby
    },
    movies: student.movies.map(m => m.name),
    friends: student.friends
  };
  log("Student profile summary:", profile);
});

// Initialize
renderProfile(student);
log("Student data:", student);