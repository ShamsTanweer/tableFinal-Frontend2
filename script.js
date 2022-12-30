fetch("https://run.mocky.io/v3/90a19450-9267-4b67-be9f-4af68c220708")
  .then((data) => {
    return data.json();
  })
  .then((objectData) => {
    data = objectData;

    console.log(data);

    let products = document.getElementsByClassName("products");
    let azBtn = document.getElementById("sortAZ");
    let zaBtn = document.getElementById("sortZA");
    let marksBtn = document.getElementById("markSort");
    let classBtn = document.getElementById("sortClass");
    let passBtn = document.getElementById("sortPassing");
    let GenderBtn = document.getElementById("sortGender");
    let searchInput = document.getElementById("search");
    let searchBtn = document.getElementById("searchBtn");

    azBtn.addEventListener("click", sortaz);
    zaBtn.addEventListener("click", sortza);
    marksBtn.addEventListener("click", sortMarks);
    classBtn.addEventListener("click", sortClass);
    passBtn.addEventListener("click", sortPassing);
    GenderBtn.addEventListener("click", sortGender);
    searchBtn.addEventListener("click", search);

    function loadData(d, isGender) {
      if (!isGender) {
        products[1].innerHTML = "";
      }

      products[isGender ? 1 : 0].innerHTML = ` <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Class</th>
        <th>Marks</th>
        <th>Passing</th>
        <th>Email</th>

    </tr>`;
      d.map((item) => {
        let lItem = document.createElement("tr");
        lItem.innerHTML = `
            <td>${item.id}</td>
            <td><img src="${item.img_src}"> ${
          item.first_name + " " + item.last_name
        }</td>
            <td>${item.gender}</td>
            <td>${item.class}</td>
            <td>${item.marks}</td>
            <td>${item.passing ? "Passing" : "Failed"}</td>
            <td>${item.email}</td>
            `;
        products[isGender ? 1 : 0].append(lItem);
      });
    }

    loadData(data);

    function sortaz() {
      let increasingData = data.sort((a, b) => {
        if (a.first_name < b.first_name) return -1;
        else if (a.first_name > b.first_name) return 1;
        else return 0;
      });
      loadData(increasingData);
    }

    function sortza() {
      let decreasingData = data.sort((a, b) => {
        if (a.first_name < b.first_name) return 1;
        else if (a.first_name > b.first_name) return -1;
        else return 0;
      });
      loadData(decreasingData);
    }

    function sortMarks() {
      let marksData = data.sort((a, b) => {
        if (a.marks < b.marks) return -1;
        else if (a.marks > b.marks) return 1;
        else return 0;
      });
      loadData(marksData);
    }

    function sortClass() {
      let classData = data.sort((a, b) => {
        if (a.class < b.class) return -1;
        else if (a.class > b.class) return 1;
        else return 0;
      });
      loadData(classData);
    }

    function sortPassing() {
      let passingData = data.filter((item) => {
        return item.passing;
      });
      loadData(passingData);
    }

    function sortGender() {
      let maleData = data.filter((item) => {
        return item.gender == "Male";
      });
      loadData(maleData);

      let femaleData = data.filter((item) => {
        return item.gender == "Female";
      });
      loadData(femaleData, "Female");
    }

    function search() {
      let s = searchInput.value;
      let matchedItems = data.filter((item) => {
        return (
          item.first_name.toLowerCase().includes(s.toLowerCase()) ||
          item.last_name.toLowerCase().includes(s.toLowerCase()) ||
          item.email.toLowerCase().includes(s.toLowerCase())
        );
      });
      loadData(matchedItems);
    }
  });
