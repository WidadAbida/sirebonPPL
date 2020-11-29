//Event listener untuk nambah obat
const tambahObat = document.querySelector('#tambahObat')

if(tambahObat){
    tambahObat.addEventListener('click', (e) => {
        e.preventDefault();
        let 
    })
}

//Kirim resep dari dokter ke db
const kirimResep = document.querySelector('#kirimResep')

if(kirimResep){
    kirimResep.addEventListener('submit', (e) => {
        e.preventDefault();

        const namaObat = kirimResep['namaObat'].value
        const minum = kirimResep['minum'].value
        const sebses = kirimResep['sebses'].value
        const namaObat = kirimResep['quantity'].value

        db.collection()
    })
}