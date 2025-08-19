
    // --- Data --------------------------------------------------------------
    const student = {
      name: "Shahin",
      id: 121,
      age: 20,
      address: "Dhaka",
      isMarried: false,
      friends: ["Shihab", "Shikot", "Shohel", "Shakil"],
      movies: [
        { name: "Leader: Ami Bangladesh", actor: "Shakib Khan", actress: "Bubly" },
        { name: "Priyo Tumi", actor: "Shakib Khan", actress: "Apu Biswas" },
        { name: "Bossgiri", actor: "Shakib Khan", actress: "Shabnom Bubly" }
      ],
      bestFriend: {
        name: "Shihab",
        id: 122,
        address: "Dhaka",
        details: {
          age: 22,
          address: "Dhaka",
          isMarried: false,
          hobby: "Playing Football"
        }
      }
    };

    // --- Helpers ----------------------------------------------------------
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

    // --- Actions (Nested Access Examples) ---------------------------------
    $("#btn-bestfriend").addEventListener("click", () => {
      // Deep nested access:
      const hobby = student?.bestFriend?.details?.hobby ?? "Not available";
      log("Best friend’s hobby:", { hobby });
    });

    $("#btn-second-actress").addEventListener("click", () => {
      // Access array item then property:
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
      // A neat, readable “profile dump”
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

    // Init
    renderProfile(student);
