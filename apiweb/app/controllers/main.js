var services = new Services();

var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function fetchData() {
  services
    .getListProduct()
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchData();

function renderHTML(data) {
  var content = "";

  data.forEach(function (product, index) {
    content += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.taiKhoan}</td>
            <td>${product.matKhau}</td>
            <td>${product.hoTen}</td>
            <td>${product.email}</td>
            <td>${product.ngonNgu}</td>
            <td>${product.loaiND}</td>
            <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct(${
                      product.id
                    })">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${
                      product.id
                    })">Delete</button>
                </td>
        </tr>
    `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

// Delete

function deleteProduct(id) {
  services
    .deleteProductApi(id)
    .then(function (result) {
      fetchData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemNguoiDung").addEventListener("click", function () {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm Người Dùng";

  var btnAdd = `<button class="btn btn-success" onclick="addProduct()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

//add

function addProduct() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var product = new Product(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  var nhanVien = layThongTinNV(true);

  if (nhanVien) {
    services
      .addProductApi(product)
      .then(function () {
        fetchData();

        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// Edit

function editProduct(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Cập Nhật Nhân Viên";

  var btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  services
    .getListProductById(id)
    .then(function (result) {
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

//update

function updateProduct(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var product = new Product(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  services
    .updateProductApi(product)
    .then(function () {
      fetchData();

      //Tắt modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Get info

function layThongTinNV(isAdd) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var isValid = true;

  // số tài khoản
  if (isAdd) {
    isValid &= validation.kiemTraRong(
      taiKhoan,
      "tbTKNV",
      "(*) vui lòng nhập số tài khoản"
    );
  }

  // họ tên
  isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "(*) vui lòng nhập họ và tên") &&
    validation.kiemTraKiTuChuoi(
      hoTen,
      "tbTen",
      "(*) vui lòng nhập đúng họ tên"
    );

  // email
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) vui lòng nhập email") &&
    validation.kiemTraEmail(
      email,
      "tbEmail",
      "(*) vui lòng nhập đúng cú pháp email"
    );

  //pass
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập mật khẩu"
    ) &&
    validation.kiemTraDoDaiPass(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập mật khẩu từ 6-8 ký tự",
      6,
      8
    ) &&
    validation.kiemTraPass(matKhau, "tbMatKhau", "(*) mật khẩu yếu");

  // Hình ảnh
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "(*) vui lòng nhập tên ảnh"
  );

  // loại người dùng
  isValid &= validation.kiemTraOption(
    "loaiNguoiDung",
    "tbLND",
    "(*) bạn là Giáo viên hay Học viên"
  );

  // ngôn ngử
  isValid &= validation.kiemTraOption(
    "loaiNgonNgu",
    "tbNgonNgu",
    "(*) vui lòng chọn ngôn ngủ của bạn"
  );

  // Mô tả
  isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "(*) vui lòng nhập mô tả") &&
    validation.kiemTraDoDaiKiTu(
      moTa,
      "tbMoTa",
      "(*) vui lòng nhập mô tả không vượt quá 60 kí tự",
      60
    );

  if (!isValid) return null;

  var product = new Product(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  return product;
}
