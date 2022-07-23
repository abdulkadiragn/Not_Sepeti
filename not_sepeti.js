const yeniGorev = document.querySelector(".input-gorev");
const yeniGorevButon = document.querySelector(".btn-gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");
document.addEventListener('DOMContentLoaded', localStroagedenOku); //bütün DOM yapısı yüklendikten sonra 'localStroagedenOku' metodunu çağır.

yeniGorevButon.addEventListener('click',gorevEkle)
gorevListesi.addEventListener('click', gorevSil);
yen


function gorevSil(e){
  const tiklanilanEleman = e.target;

  //tıklanılanEleman'ın claslistesinde 'gorev-btn-tamamlandi' varsa gir
  if (tiklanilanEleman.classList.contains("gorev-btn-tamamlandi")) {
    tiklanilanEleman.parentElement.classList.toggle("gorev-tamamlandi"); //tıklanılan elemanının bulundugu parent'ın class'ına toggle içindekini ekler
  }

  //tıklanılanEleman'ın claslistesinde 'gorev-btn-sil' varsa gir
  if (tiklanilanEleman.classList.contains("gorev-btn-sil")) {

    //alert ile onaylaması için confirm kullanıldı.
    if(confirm ('silmek istediğinize emin misiniz?')){
      //tiklanılan eleman'ın parent class'ına kaybol ekle (animasyon için)
      tiklanilanEleman.parentElement.classList.toggle("kaybol");
      const silinecekGorev =
        tiklanilanEleman.parentElement.children[0].innerText; //silinecek elemanın 'localStoragedenSil' metoduna gönderebilmek için bir degiskene atadık.
      localStoragedenSil(silinecekGorev);

      //animasyon bittikten sonra silme işlemini yapması için (transitionend)
      tiklanilanEleman.parentElement.addEventListener(
        "transitionend",
        function () {
          tiklanilanEleman.parentElement.remove();
        }
      );
    }
  }
}

function gorevEkle(e) {
  e.preventDefault();
  if (yeniGorev.value.length > 0) {
    gorevItemOlustur(yeniGorev.value);
    localStorageKaydet(yeniGorev.value); //yeniGorev degerini localStorageKaydet fonksiyonuna kaydetmek için gönderdik
    yeniGorev.value = ""; //gorev ekleme oldugunda input içini boşalt
    
  }
  else{
    alert('Boş görev tanımı yapılamaz!!')
  }
}

//tekrar et!!!!
function localStorageKaydet(yeniGorev){
    let gorevler;
    if(localStorage.getItem('gorevler') === null){
        gorevler = [];
    }
    else{
        gorevler = JSON.parse(localStorage.getItem('gorevler')) //json formatında aldıgımız gorevleri arrayimize ata
    }
    gorevler.push(yeniGorev);

    //dizimizin yeni halini eklemek için
    localStorage.setItem('gorevler',JSON.stringify(gorevler))

}

//eski kayıtları browser tekrar acıldıgında görebilmek için
//localStoroge da tutulan bilgileri tekrar ekrana yazdırma.
function localStroagedenOku(){
        let gorevler;
        if(localStorage.getItem('gorevler') === null){
            gorevler = [];
        }
        else{
            gorevler = JSON.parse(localStorage.getItem('gorevler'));
        }
        gorevler.forEach(gorev =>  
            gorevItemOlustur(gorev)
        );
}


function gorevItemOlustur(gorev){
  //div olusturma
  const gorevDiv = document.createElement("div");
  gorevDiv.classList.add("gorev-item");

  //li olusturma
  const gorevLi = document.createElement("li");
  gorevLi.classList.add("gorev-tanim");
  gorevLi.innerText = gorev;

  //div icerisine li ekleme
  gorevDiv.appendChild(gorevLi);

  //ul'ye oluşturulan Div'i ekleme
  gorevListesi.appendChild(gorevDiv);

  //tamamlandı butonu ekleme
  const gorevTamamlandiBtn = document.createElement("button");
  gorevTamamlandiBtn.classList.add("gorev-btn");
  gorevTamamlandiBtn.classList.add("gorev-btn-tamamlandi");

  gorevTamamlandiBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

  gorevDiv.appendChild(gorevTamamlandiBtn);

  //silme butonu ekleme
  const gorevSilmeBtn = document.createElement("button");
  gorevSilmeBtn.classList.add("gorev-btn");
  gorevSilmeBtn.classList.add("gorev-btn-sil");

  gorevSilmeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; //içerisine html ekledik

  gorevDiv.appendChild(gorevSilmeBtn);
}

function localStoragedenSil(gorev){
        let gorevler;
        if (localStorage.getItem("gorevler") === null) {
          gorevler = [];
        } else {
          gorevler = JSON.parse(localStorage.getItem("gorevler"));
        }

        //splice ile eleman silme
        const silinecekElemanIndex = gorevler.indexOf(gorev); //silinecek elemanın array'de index numarasını bulduk
        gorevler.splice(silinecekElemanIndex,1); //index numarası : silinecekElemanIndex, kac eleman silinecen : 1

        localStorage.setItem('gorevler', JSON.stringify(gorevler)); //güncellemeyi localStorage'a yansıttık.
}