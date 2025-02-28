describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/order"); // Sayfaya gidiliyor
  });
});

describe("Sipariş Formu Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/order"); // Her testten önce sayfaya gidiliyor
  });

  it("isim alanına doğru bir isim girilebilmeli", () => {
    cy.get('input[name="isim"]').type("İsa Öcel"); // İsim giriliyor
    cy.get('input[name="isim"]').should("have.value", "İsa Öcel"); // İsim doğru girildi mi kontrol ediliyor
  });

  it("birden fazla ek malzeme seçilebilmeli", () => {
    const malzemeler = ["Pepperoni", "Sosis", "Kanada Jambonu"];

    malzemeler.forEach((malzeme) => {
      cy.get(`input[name="${malzeme}"]`).check(); // Her malzeme seçiliyor
      cy.get(`input[name="${malzeme}"]`).should("be.checked"); // Seçildiği doğrulanıyor
    });
  });

  it("ek malzemeler seçildiğinde toplam fiyat doğru hesaplanmalı", () => {
    cy.get('input[name="isim"]').type("İsa Öcel");
    cy.get('input[name="boyut"][value="kucuk"]').check();
    cy.get('select[name="hamur"]').select("ince");
    cy.get('input[name="Pepperoni"]').check();
    cy.get('input[name="Sosis"]').check();
    cy.get('input[name="Kanada Jambonu"]').check();
    cy.get('input[name="Salam"]').check();

    cy.get(".siparis-toplami-ust .toplam-ucret-tl").should(
      "contain",
      "105.50₺" // Fiyatın doğru hesaplanıp hesaplanmadığı kontrol ediliyor
    );
  });

  it("form geçerli olmadığında gönderim butonu devre dışı olmalı", () => {
    cy.get('button[type="submit"]').should("be.disabled"); // Gönderim butonunun devre dışı olup olmadığı kontrol ediliyor
  });

  it("form geçerli olduğunda gönderim butonu aktif olmalı", () => {
    cy.get('input[name="isim"]').type("İsa Öcel");
    cy.get('input[name="boyut"][value="kucuk"]').check();
    cy.get('select[name="hamur"]').select("ince");
    cy.get('input[name="Pepperoni"]').check();
    cy.get('input[name="Sosis"]').check();
    cy.get('input[name="Kanada Jambonu"]').check();
    cy.get('input[name="Tavuk Izgara"]').check();
    cy.get('button[type="submit"]').should("not.be.disabled"); // Gönderim butonunun aktif olduğu kontrol ediliyor
  });

  it("form doğru şekilde gönderilebilmeli", () => {
    cy.get('input[name="isim"]').type("İsa Öcel");
    cy.get('input[name="boyut"][value="kucuk"]').check();
    cy.get('select[name="hamur"]').select("ince");
    cy.get('input[name="Pepperoni"]').check();
    cy.get('input[name="Sosis"]').check();
    cy.get('input[name="Kanada Jambonu"]').check();
    cy.get('input[name="Salam"]').check();

    cy.intercept("POST", "https://reqres.in/api/pizza").as("siparisRequest"); // POST isteği yakalanıyor
    cy.get('button[type="submit"]').click(); // Gönderim butonuna tıklanıyor

    cy.url().should("include", "/success"); // Başarı sayfasına yönlendirildiği kontrol ediliyor
  });
});
