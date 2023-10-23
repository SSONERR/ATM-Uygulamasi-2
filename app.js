//Atm Uygulamasına Hoşgeldin 
//Eğer LocalStorage'deki değeri NaN yaptıysan bu kodu çalıştır ---> localStorage.setItem("bakiyeStorage","0")

let sayi = localStorage.getItem("bakiyeStorage")
let storageBakiye = parseFloat(sayi)
const bakiyeTus = document.createElement("bakiyeTus")
const paraÇekTuş = document.createElement("paraCekTus")
const paraÇekİşlem = document.createElement("paraçekişlem")
const paraYatırTuş = document.createElement("paraYatirTus")
const paraYatırİşlem = document.createElement("parayatırişlem")
const çıkış = document.createElement("cikisTus")
const geri = document.createElement("geri")
const cardHeader = document.querySelector(".card-header")
const cardBody = document.querySelector("#body")
const giriş = document.querySelector("#giris")
const satır1 = document.querySelector("#satır1")
const satır2 = document.querySelector("#satır2")
const textHos = document.querySelector("#hos")
const input = document.querySelector("#input")
let bakiyeAlert = document.querySelector("#bakiye")

run()
function run() {
    giriş.addEventListener("click", başlat)
    çıkış.addEventListener("click", bitir)
    bakiyeTus.addEventListener("click", bakiyeGöster)
    paraÇekTuş.addEventListener("click", paraÇekBaslat)
    paraYatırTuş.addEventListener("click", paraYatırBaşlat)
    geri.addEventListener("click", geriDön)
    //bakiye güncellemesi için
    bakiyeGöster()
    bakiyeAlert.remove()
    input.remove()
}
function başlat() {
    //giriş tuşuna basınca başlar spin gelir yazı değişir 
    const spin = document.createElement("loading")
    spin.className = "spinner-border text-success mt-2"
    //giriş tuşu ile spini yer değiştirir
    cardBody.replaceChild(spin, cardBody.childNodes[0])
    //giriş tuşunu kaldırır
    giriş.remove()
    textHos.textContent = "Giriş Yapılıyor"
    setTimeout(function () {
        //tuşları çağırır spini ve yazıyı kaldırır
        tuslarGöster()
        spin.remove()
        textHos.remove()
    }, 2500);
}
function tuslarGöster() {
    //tuşlar
    bakiyeTus.className = "btn btn-outline-success col-5"
    bakiyeTus.innerHTML = "Bakiye"

    paraYatırTuş.className = "btn btn-outline-success col-5"
    paraYatırTuş.innerHTML = "Para Yatır"

    paraÇekTuş.className = "btn btn-outline-success col-5"
    paraÇekTuş.innerHTML = "Para Çek"

    çıkış.className = "btn btn-outline-danger col-5"
    çıkış.innerHTML = "Çıkış"
    //içe ekleme
    satır1.appendChild(paraÇekTuş)
    satır1.appendChild(paraYatırTuş)
    satır2.appendChild(bakiyeTus)
    satır2.appendChild(çıkış)
}
function bitir() {
    //çıkış tuşuna basınca çalışır
    //tuşları siler
    çekÇık()
    //text ve spin ekler
    cardHeader.appendChild(textHos)
    textHos.textContent = "Çıkış Yapılıyor"
    textHos.className = "border border-dark py-1 rounded  alert alert-danger text-center col-12"
    const spin = document.createElement("loading")
    spin.className = "spinner-border text-danger mt-2"
    cardBody.appendChild(spin)
    setTimeout(function () {
        //spini ve texti kaldırıp giriş ekranını tekrar getirir
        spin.remove()
        cardBody.appendChild(giriş)
        textHos.className = "border border-dark py-1 rounded  alert alert-success text-center col-12"
        textHos.textContent = "Atm Uygulaması'na Hoşgeldiniz"
        cardHeader.appendChild(textHos)
    }, 2500);
}
function bakiyeGöster() {
    //bakiyeyi yazdırır
    bakiyeAlert.textContent = "Bakiye : " + storageBakiye + " TL "
    cardHeader.appendChild(bakiyeAlert)
    //bakiye tuşunu kapatır
    bakiyeTus.classList.add("disabled")
    paraYatırTuş.classList.add("disabled")
    paraÇekTuş.classList.add("disabled")
    setTimeout(function () {
        //tuşu tekrar açar
        bakiyeAlert.remove()
        bakiyeTus.classList.remove("disabled")
        paraYatırTuş.classList.remove("disabled")
    paraÇekTuş.classList.remove("disabled")
    }, 2500)
}
function paraÇekBaslat() {
    //para çek butonu ilk basışta çalışır
    //input ve bakiyeyi gösterir
    cardHeader.appendChild(input)
    bakiyeAlert.textContent = "Bakiye : " + storageBakiye + " TL "
    cardHeader.appendChild(bakiyeAlert)
    //gereksiz tuşları gizler
    paraÇekTuş.remove()
    paraYatırTuş.remove()
    bakiyeTus.remove()
    //ikinci butonu ekler
    paraÇekİşlem.className = "btn btn-outline-success col-12"
    paraÇekİşlem.textContent = "Para Çek"
    cardBody.appendChild(paraÇekİşlem)
    //çıkışla geriyi düzenler
    çıkış.className = "btn btn-outline-danger col-5 order-2"
    geri.className = "btn btn-outline-danger col-5 order-1"
    geri.textContent = "Geri"
    satır2.appendChild(geri)
    //para çek butonu ikinci basışta çalışır
    paraÇekİşlem.addEventListener("click", paraçekBitir)
}
function paraçekBitir() {
    //inputa girilen değer :
    if (input.value > 0 && input.value <= storageBakiye) {
        //doğru ise çalışır
        //tuşları ve inputu kaldırıp spin ekler
        const spin = document.createElement("loading")
        spin.className = "spinner-border text-success mt-2 mx-auto"
        paraÇekİşlem.replaceWith(spin)
        çekÇık()
        //çekme işlemi
        storageBakiye -= parseFloat(input.value)
        localStorage.setItem("bakiyeStorage", storageBakiye)
        //bilgilendirme mesajı
        textHos.className = "border border-dark py-1 rounded  alert alert-success text-center col-12"
        textHos.textContent = "İşlem başarılı Güncel bakiyeniz : " + storageBakiye + " TL'dir"
        cardHeader.appendChild(textHos)
        setTimeout(function () {
            //input değerini sıfırlar spin ve texti kaldırır tuşları ekler
            input.value = ""
            spin.remove()
            textHos.remove()
            tuslarGöster()
        }, 2500);


    } else if (input.value == 0) {
        //0 ise çalışır
        textHos.textContent = "Lütfen 0'dan büyük bir tutar giriniz !"
        textHos.className = "border border-dark py-1 rounded  alert alert-danger text-center col-12"
        cardHeader.appendChild(textHos)
        paraÇekİşlem.classList.add("disabled")
        setTimeout(function () {
            textHos.remove()
            paraÇekİşlem.classList.remove("disabled")
        }, 1500);
    } else {
        //bakiyeden büyükse çalışır
        textHos.textContent = "Lütfen bakiyenizden büyük bir tutar girmeyiniz!"
        textHos.className = "border border-dark py-1 rounded  alert alert-danger text-center col-12"
        cardHeader.appendChild(textHos)
        paraÇekİşlem.classList.add("disabled")
        setTimeout(function () {
            textHos.remove()
            paraÇekİşlem.classList.remove("disabled")
        }, 1500);
    }
}
function paraYatırBaşlat() {
    //para yatır butonu ilk basışta çalışır
    cardHeader.appendChild(input)
    //bakiyeyi günceller
    bakiyeAlert.textContent = "Bakiye : " + storageBakiye + " TL "
    cardHeader.appendChild(bakiyeAlert)
     //gereksiz tuşları gizler
    paraÇekTuş.remove()
    paraYatırTuş.remove()
    bakiyeTus.remove()
    //ikinci butonu ekler
    paraYatırİşlem.className = "btn btn-outline-success col-12"
    paraYatırİşlem.textContent = "Para Yatır"
    cardBody.appendChild(paraYatırİşlem)
    //çıkışla geriyi düzenler
    çıkış.className = "btn btn-outline-danger col-5 order-2"
    geri.className = "btn btn-outline-danger col-5 order-1"
    geri.textContent = "Geri"
    satır2.appendChild(geri)
    //para yatır butonuna ikinci basışta çalışır
    paraYatırİşlem.addEventListener("click", paraYatırBitir)
}
function paraYatırBitir() {
            //inputa girilen değer :
    if (input.value > 0 && input.value <= 10000) {
        //doğru ise çalışır
        //tuşları ve inputu kaldırıp spin ekler
        const spin = document.createElement("loading")
        spin.className = "spinner-border text-success mt-2 mx-auto"
        paraYatırİşlem.replaceWith(spin)
        çekÇık()
        //toplama işlemi
        storageBakiye += parseFloat(input.value)
        localStorage.setItem("bakiyeStorage", storageBakiye)
        //bilgilendirme mesajı
        textHos.className = "border border-dark py-1 rounded  alert alert-success text-center col-12"
        textHos.textContent = "İşlem başarılı Güncel bakiyeniz : " + storageBakiye + " TL'dir"
        cardHeader.appendChild(textHos)
        setTimeout(function () {
            //input değerini sıfırlar spin ve texti kaldırır tuşları ekler
            input.value = ""
            spin.remove()
            textHos.remove()
            tuslarGöster()
        }, 2500);


    } else if (input.value == 0) {
        textHos.textContent = "Lütfen 0'dan büyük bir tutar giriniz !"
        textHos.className = "border border-dark py-1 rounded  alert alert-danger text-center col-12"
        cardHeader.appendChild(textHos)
        paraYatırİşlem.classList.add("disabled")
        setTimeout(function () {
            textHos.remove()
            paraYatırİşlem.classList.remove("disabled")
        }, 1500);
    } else {
        textHos.textContent = "Lütfen 10.000 TL'den büyük bir tutar girmeyiniz !"
        textHos.className = "border border-dark py-1 rounded  alert alert-danger text-center col-12"
        cardHeader.appendChild(textHos)
        paraYatırİşlem.classList.add("disabled")
        setTimeout(function () {
            textHos.remove()
            paraYatırİşlem.classList.remove("disabled")
        }, 1500);
    }
}
function geriDön() {
    //geri dön tuşuna basınca çalışır tüm tuşları silip gereklileri getirir
    bakiyeAlert.remove()
    input.remove()
    textHos.remove()
    paraÇekİşlem.remove()
    paraYatırİşlem.remove()
    çıkış.remove()
    geri.remove()
    tuslarGöster()
}
function çekÇık() {
    //tüm tuşları ve inputları siler
    paraÇekTuş.remove()
    paraYatırTuş.remove()
    bakiyeTus.remove()
    geri.remove()
    paraYatırİşlem.remove()
    paraÇekİşlem.remove()
    çıkış.remove()
    input.remove()
    bakiyeAlert.remove()
}