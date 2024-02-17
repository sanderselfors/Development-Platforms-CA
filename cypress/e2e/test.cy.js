describe("API Endpoints", () => {
  const baseUrl = "https://dp-ca.onrender.com";
  let productIdToDelete; // Variable to store the ID of the product to be deleted

  it("GET /products/:id should return a single product", () => {
    cy.request(`${baseUrl}/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("List of products");
      expect(response.body.data).to.be.an("array");
      // Retrieve the ID of the first product in the list
      const productIdToRetrieve = response.body.data[0].id;

      // Ensure productIdToRetrieve is defined
      expect(productIdToRetrieve).to.be.a("string");

      // Retrieve the single product by its ID
      cy.request(`${baseUrl}/products/${productIdToRetrieve}`).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Product details");
          expect(response.body.data).to.be.an("object");
          expect(response.body.data).to.have.property(
            "id",
            productIdToRetrieve
          );
        }
      );
    });
  });

  it("GET /products should return a list of products", () => {
    cy.request(`${baseUrl}/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("List of products");
      expect(response.body.data).to.be.an("array");
    });
  });

  it("POST /products should add a new product", () => {
    const newProduct = {
      name: "New Product",
      price: 10.99,
    };

    cy.request("POST", `${baseUrl}/products`, newProduct).then((response) => {
      expect(response.status).to.eq(200);
      // Store the ID of the newly created product
      productIdToDelete = response.body.message.split(" ")[3];
    });
  });

  it("DELETE /products/:id should delete a product", () => {
    // Ensure productIdToDelete is defined
    expect(productIdToDelete).to.be.a("string");

    cy.request("DELETE", `${baseUrl}/products/${productIdToDelete}`)
      .its("status")
      .should("eq", 200);
  });
});
