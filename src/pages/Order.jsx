import "../reset.css";
import "../App.css";
import CheckboxItem from "../components/CheckBoxItem";
import CountButton from "../components/CountButton";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Pizzas = [
  {
    pizzaAdi: "Position Absolute Acı Pizza",
    pizzaAciklamasi:
      "Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.",
    pizzaFiyatı: 85.5,
    pizzaYorumSayisi: 200,
    pizzaOrtalamaPuan: 4.9,
  },
];

const myPizza = Pizzas[0];

const ekMalzemeler = [
  "Pepperoni",
  "Sosis",
  "Kanada Jambonu",
  "Tavuk Izgara",
  "Soğan",
  "Domates",
  "Mısır",
  "Sucuk",
  "Jalepeno",
  "Sarımsak",
  "Biber",
  "Salam",
  "Ananas",
  "Kabak",
];

const initialFormState = {
  isim: "",
  boyut: "",
  hamur: "",
  ekMalzemeler: [],
  siparisNotu: "",
  adet: 1,
  ekMalzemeFiyati: 0,
  toplamFiyat: 0,
};

function Order() {
  const [form, setForm] = useState(initialFormState);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    isim: false,
    boyut: false,
    hamur: false,
    ekMalzemeler: false,
    adet: false,
  });
  const history = useHistory();

  useEffect(() => {
    const ekMalzemeFiyati = form.ekMalzemeler.length * 5 * form.adet;
    const toplamFiyat = form.adet * myPizza.pizzaFiyatı + ekMalzemeFiyati;

    setForm((prevForm) => ({
      ...prevForm,
      ekMalzemeFiyati,
      toplamFiyat,
    }));
  }, [form.ekMalzemeler, form.adet]);

  useEffect(() => {
    setErrors({
      isim: form.isim.trim().length < 3,
      boyut: form.boyut === "",
      hamur: form.hamur === "",
      ekMalzemeler:
        form.ekMalzemeler.length < 4 || form.ekMalzemeler.length > 10,
      adet: !form.adet > 0,
    });

    const isFormValid =
      form.isim.trim().length >= 3 &&
      form.boyut !== "" &&
      form.hamur !== "" &&
      form.ekMalzemeler.length >= 4 &&
      form.ekMalzemeler.length <= 10 &&
      form.adet > 0;

    setIsValid(isFormValid);
  }, [form]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setForm((prevForm) => {
        const newToppings = checked
          ? [...prevForm.ekMalzemeler, name]
          : prevForm.ekMalzemeler.filter((t) => t !== name);

        return { ...prevForm, ekMalzemeler: newToppings };
      });
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  }

  function handleOrderSubmit(event) {
    event.preventDefault();
    if (!isValid) {
      console.error("Form geçerli değil, lütfen eksikleri tamamlayın.");
      return;
    }

    axios
      .post("https://reqres.in/api/pizza", form)
      .then((response) => {
        console.log("Sipariş özeti:", response.data);
        history.push("/success");
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  }

  return (
    <>
      <div className="main">
        <Banner />
        <div className="content-container">
          <div className="left-spacer"></div>
          <div className="center-content">
            <NavBar />
            <h2>{myPizza.pizzaAdi}</h2>
            <div className="pizza-info">
              <p className="price">{myPizza.pizzaFiyatı.toFixed(2)}₺</p>
              <p className="rating">{myPizza.pizzaOrtalamaPuan}</p>
              <p className="number-of-votes">({myPizza.pizzaYorumSayisi})</p>
            </div>
            <p className="explanation">{myPizza.pizzaAciklamasi}</p>

            <form onSubmit={(event) => handleOrderSubmit(event)}>
              <div className="boyut-hamur-container">
                <div className="boyut-sec">
                  <label className="boyut-sec-aciklama">
                    Boyut Seç <span>*</span>
                  </label>
                  <label key="kucuk">
                    <input
                      type="radio"
                      name="boyut"
                      value="kucuk"
                      checked={form.boyut === "kucuk"}
                      onChange={handleChange}
                    />
                    Küçük
                  </label>
                  <label key="orta">
                    <input
                      type="radio"
                      name="boyut"
                      value="orta"
                      checked={form.boyut === "orta"}
                      onChange={handleChange}
                    />
                    Orta
                  </label>
                  <label key="buyuk">
                    <input
                      type="radio"
                      name="boyut"
                      value="buyuk"
                      checked={form.boyut === "buyuk"}
                      onChange={handleChange}
                    />
                    Büyük
                  </label>
                </div>

                <div className="hamur-sec">
                  <label htmlFor="hamur" className="hamur-sec-aciklama">
                    Hamur Seç <span>*</span>
                  </label>
                  <select
                    id="hamur"
                    name="hamur"
                    onChange={handleChange}
                    value={form.hamur}
                  >
                    <option value="" disabled>
                      Hamur Kalınlığı
                    </option>
                    <option value="ince">İnce</option>
                    <option value="kalin">Kalın</option>
                  </select>
                </div>
              </div>

              <p className="ek-malzeme-baslik">Ek malzemeler</p>
              <p className="ek-malzeme-aciklama">
                En Fazla 10 malzeme seçebilirsiniz. 5₺
              </p>
              <div className="ek-malzeme-checkbox-container">
                {ekMalzemeler.map((ekMalzeme, index) => (
                  <CheckboxItem
                    key={index}
                    label={ekMalzeme}
                    checked={form.ekMalzemeler.includes(ekMalzeme)}
                    name={ekMalzeme}
                    onChange={handleChange}
                  />
                ))}
              </div>

              <p className="siparis-notu-baslik">Sipariş Notu </p>
              <div className="textbox-container">
                <input
                  type="text"
                  id="isim"
                  name="isim"
                  className="textbox"
                  placeholder="Ad Soyad?"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  id="textbox"
                  name="siparisNotu"
                  className="textbox"
                  placeholder="Siparişine eklemek istediğin bir not var mı?"
                  onChange={handleChange}
                />
              </div>

              <hr className="solid-hr" />
              <div className="bottom-container">
                <CountButton handleChange={handleChange} adet={form.adet} />

                <div className="siparis-toplami">
                  <div className="siparis-toplami-ust">
                    <div className="siparis-title">Sipariş Toplamı</div>
                    <div className="secim-ucreti-container">
                      <div className="secim-ucreti">Seçimler</div>
                      <div className="secim-ucreti-tl">
                        {form.ekMalzemeFiyati.toFixed(2)}₺
                      </div>
                    </div>
                    <div className="toplam-ucret-container">
                      <div className="toplam-ucret">Toplam</div>
                      <div className="toplam-ucret-tl">
                        {form.toplamFiyat.toFixed(2)}₺
                      </div>
                    </div>
                  </div>
                  <div className="siparis-toplami-alt">
                    <button
                      type="submit"
                      className="siparis-ver"
                      disabled={!isValid}
                    >
                      Sipariş Ver
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="right-spacer"></div>
        </div>
      </div>
    </>
  );
}

export default Order;
