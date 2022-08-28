var service = new Service();

function getEle(id) {
  return document.getElementById(id);
}

function fetchData() {
  //pending
  service
    .getListProduct()
    .then(function (result) {
      // response
      renderHTML(result.data);
    })
    .catch(function (error) {
      // response
      console.log(error);
    });
}
fetchData();

function renderHTML(data) {
  var content = "";

  data.forEach(function (product) {
    content += `
    <div class="team__item col-md-6 col-sm-6 col-lg-3">
    <div class="team__info">
      <img class="img-fluid" src="./img/${product.hinhAnh}" alt="" />
      <div class="team__body">
        <h5>${product.ngonNgu}</h5>
        <h3>${product.hoTen}</h3>
        <p>${product.moTa}</p>
      </div>
    </div>
  </div>
    `;
  });

  getEle("team__contentAPI").innerHTML = content;
}
