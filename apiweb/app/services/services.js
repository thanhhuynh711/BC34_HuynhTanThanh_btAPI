function Services() {
  this.getListProduct = function () {
    return axios({
      url: "https://6301cf979a1035c7f8073dd8.mockapi.io/api/products",
      method: "GET",
    });
  };

  this.deleteProductApi = function (id) {
    return axios({
      url: `https://6301cf979a1035c7f8073dd8.mockapi.io/api/products/${id}`,
      method: "DELETE",
    });
  };

  this.addProductApi = function (product) {
    return axios({
      url: "https://6301cf979a1035c7f8073dd8.mockapi.io/api/products",
      method: "POST",
      data: product,
    });
  };

  this.getListProductById = function (id) {
    return axios({
      url: `https://6301cf979a1035c7f8073dd8.mockapi.io/api/products/${id}`,
      method: "GET",
    });
  };

  this.updateProductApi = function (product) {
    return axios({
      url: `https://6301cf979a1035c7f8073dd8.mockapi.io/api/products/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}
