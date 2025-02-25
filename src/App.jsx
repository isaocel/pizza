import TYlogo from "./assets/TYlogo.svg";
import "./reset.css";
import "./App.css";
import CheckboxItem from "./components/CheckBoxItem";
import CountButton from "./components/CountButton";
import NavBar from "./components/NavBar";

const pizzaToppings = [
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

function App() {
  function handleChange() {}

  return (
    <>
      <div className="main">
        <div className="banner">
          <div className="logo">
            <img src={TYlogo} alt="Teknolojik Yemekler Logo" />
          </div>
        </div>
        <div className="content-container">
          <div className="left-spacer"></div>
          <div className="center-content">
            <NavBar />
            <h2>Position Absolute Acı Pizza</h2>
            <div className="pizza-info">
              <p className="price">85.50₺</p>
              <p className="rating">4.9</p>
              <p className="number-of-votes">(200)</p>
            </div>
            <p className="explanation">
              Frontend Dev olarak hala position:absolute kullanıyorsan bu çok
              acı pizza tam sana göre. Pizza, domates, peynir ve genellikle
              çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak
              odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
              yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan
              İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen
              pizzetta denir.
            </p>
            <div className="boyut-hamur-container">
              <div className="boyut-sec">
                <label className="boyut-sec-aciklama">
                  Boyut Seç <span>*</span>
                </label>
                <label key="kucuk">
                  <input type="radio" name="boyut" value="kucuk" />
                  Küçük
                </label>
                <label key="orta">
                  <input type="radio" name="boyut" value="orta" />
                  Orta
                </label>
                <label key="buyuk">
                  <input type="radio" name="boyut" value="buyuk" />
                  Büyük
                </label>
              </div>

              <div className="hamur-sec">
                <label htmlFor="hamur" className="hamur-sec-aciklama">
                  Hamur Seç <span>*</span>
                </label>
                <select id="hamur" name="hamur">
                  <option value="" disabled selected>
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
            <div className="ek-malzeme-sec"></div>
            <div className="ek-malzeme-checkbox-container">
              {pizzaToppings.map((topping, index) => (
                <CheckboxItem
                  key={index}
                  label={topping}
                  checked={false}
                  onChange={handleChange}
                />
              ))}
            </div>
            <p className="siparis-notu-baslik">Sipariş Notu </p>

            <div className="textbox-container">
              <input
                type="text"
                id="textbox"
                className="textbox"
                placeholder="Siparişine eklemek istediğin bir not var mı?"
              />
            </div>
            <hr className="solid-hr" />
            <div className="bottom-container">
              <CountButton />
              <div className="siparis-toplami">
                <div className="siparis-toplami-ust">
                  <div className="siparis-title">Secimler Toplamı</div>
                  <div className="secim-ucreti-container">
                    <div className="secim-ucreti">Seçimler</div>
                    <div className="secim-ucreti-tl">25.00₺</div>
                  </div>
                  <div className="toplam-ucret-container">
                    <div className="toplam-ucret">Toplam</div>
                    <div className="toplam-ucret-tl">110.50₺</div>
                  </div>
                </div>
                <div className="siparis-toplami-alt">
                  <button className="siparis-ver">Sipariş Ver</button>
                </div>
              </div>
            </div>
          </div>

          <div className="right-spacer"></div>
        </div>
      </div>
    </>
  );
}

export default App;
