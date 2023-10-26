import { test } from "../utils/pageFixture";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Add to cart All Samsung mobiles with Price Value greater than 25K and Less than 80K. Move to the checkout screen and update quantity to 5 for any phone model in the cart.", async ({
  page,
  homePage,
  productCatalog,
  productDetails,
  checkout,
}) => {
  await homePage.searchProduct("samsung mobile");

  const count = await productCatalog.getProductCount();

  for (let i = 1; i <= count; i++) {
    const price = await productCatalog.getProductPrice(i);

    if (price > 25000 && price < 80000) {
      await productCatalog.clickProduct(i);
      await productDetails.addToCart();
      await page.goBack();
    } else {
      console.log("The price is not in range.");
    }
  }
  //navigate to checkout page
  await checkout.gotToCheckout();
  //Update product Quantity to 3 As Daraz maximum allow to add 3 instead of 5
  await checkout.updateProductQuantity("3");
});

test("Add to cart all Samsung mobiles with operating System Android 12. Move to the checkout screen and remove any phone model from the cart.", async ({
  page,
  productCatalog,
  homePage,
  productDetails,
  checkout,
}) => {
  await homePage.searchProduct("samsung mobile");

  const count = await productCatalog.getProductCount();

  for (let i = 1; i <= count; i++) {
    await productCatalog.clickProduct(i);
    const productDetail = await productDetails.getProductDetails();

    if (productDetail.includes("Android 12")) {
      await productDetails.addToCart();
      await page.goBack();
    } else {
      console.log("Android 12 OS not found");
      await page.goBack();
    }
  }

  //navigate to checkout page
  await checkout.gotToCheckout();
  //Delete a product with Delete dilogue confirmation
  await checkout.deleteProduct();
});

test("Add to cart all Samsung mobiles with free delivery where Price range is less than 50K", async ({
  page,
  productCatalog,
  homePage,
  productDetails,
}) => {
  await homePage.searchProduct("samsung mobile");

  const count = await productCatalog.getProductCount();

  for (let i = 1; i <= count; i++) {
    const freeShip = await productCatalog.deliveryFee(i);
    const price = await productCatalog.getProductPrice(i);

    if (freeShip === "Free Shipping" && price < 50000) {
      await productCatalog.clickProduct(i);
      await productDetails.addToCart();
      await page.goBack();
    } else {
      console.log("No Free Shipping");
    }
  }
});
