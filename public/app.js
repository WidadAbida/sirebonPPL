//Event listener untuk nambah obat
const tambahObat = document.querySelector('#tambahObat')

//Kirim resep dari dokter ke db
const kirimResep = document.querySelector('#kirimResep')

if(kirimResep){
    kirimResep.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = kirimResep['email'].value
        const namaObat = kirimResep['namaObat'].value
        const minum = kirimResep['minum'].value
        const sebses = kirimResep['sebses'].value
        const quantity = kirimResep['quantity'].value

        db.collection('jadwal').doc(email).get().then((doc) =>{
            console.log(doc)
            let obat = doc.data().obat
            let frekuensi = doc.data().frekuensi
            let csebses = doc.data().sebses
            let cquantity = doc.data().quantity

            obat.push(namaObat)
            frekuensi.push(minum)
            csebses.push(sebses)
            cquantity.push(quantity)

            db.collection('jadwal').doc(email).set({
                obat : obat,
                frekuensi : frekuensi,
                sebses : csebses,
                quantity : cquantity
            }, {merge : true}).then(() =>{
                alert('Resep terkirim')
            })
        })
    })
}