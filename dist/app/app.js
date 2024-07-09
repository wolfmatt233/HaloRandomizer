$(window).on("load", () => {
  initListeners();
});

function initListeners() {
  $("#generator").on("submit", getMission);
}

function getMission(e) {
  e.preventDefault();
  let filters = e.currentTarget;

  fetch("./data/storage.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let totalData = [];

      for (let i = 0; i < 6; i++) {
        if (filters[i].checked == true) {
          let gameList = eval("data." + filters[i].name + ".missions");
          let title = eval("data." + filters[i].name + ".title");

          gameList.forEach((level) => {
            totalData.push({
              title: title,
              level: level,
              id: filters[i].name,
            });
          });
        }
      }

      let randomLevel = totalData[Math.floor(Math.random() * totalData.length)];
      let imageRef = randomLevel.level
        .replace(/\s/g, "")
        .replace("'", "")
        .replace(":", "");

      $("#display").html(`
        <div class="text-white text-center relative">
          <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] upper">
            <p class="sm:text-4xl text-2xl">${randomLevel.level}</p>
            <p class="sm:text-2xl text-lg mt-3">${randomLevel.title}</p>
          </div>
          <img src="./img/${randomLevel.id}/${imageRef}.jpg" class="rounded-lg shadow-inner darken w-full lg:w-3/4 mx-auto" />
        </div>
      `);
    })
    .catch((e) => {
      console.log(e);
    });
}
