const waitFor = (selector) => {
  //custom debounce
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 30);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 2000);
  });
};

//init testing environment
beforeEach(() => {
  document.querySelector("#target").innerHTML = "";
  createAutoComplete({
    root: document.querySelector("#target"), //test on target div
    fetchData() {
      return [
        { Title: "Data 001  " },
        { Title: "Data 002  " },
        { Title: "Data 003  " },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});

it("Dropdown initially closed", () => {
  const dropdown = document.querySelector(".dropdown"); //select dropdown on search

  expect(dropdown.className).not.to.include("is-active"); //chai test on dropdown className
});

it("After search, dropdown opens and is active", async () => {
  const input = document.querySelector("input");
  input.value = "django";
  input.dispatchEvent(new Event("input")); //simulate a DOM event for testing

  await waitFor(".dropdown-item");

  const dropdown = document.querySelector(".dropdown");

  expect(dropdown.className).to.include("is-active");
});

it("After searching, displays some results", async () => {
  const input = document.querySelector("input");
  input.value = "API Request Test";
  input.dispatchEvent(new Event("input")); //simulate a DOM event for testing

  await waitFor(".dropdown-item");

  const items = document.querySelectorAll(".dropdown-item");
  expect(items.length).to.equal(3);
});
