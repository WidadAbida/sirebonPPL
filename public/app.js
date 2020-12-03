//Kirim resep dari dokter ke pasien
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
                kirimResep.reset()
            })
        })
    })
}

// Kirim request dari pasien ke dokter

const mintaResep = document.querySelector('#mintaResep')

if(mintaResep){
    auth.onAuthStateChanged(function(user) {
        if (user) {
            mintaResep.addEventListener('submit', (e) => {
                e.preventDefault();

                const email = user.email

                db.collection('pasien').doc(email).get().then(function(doc){
                    const dokter = doc.data().dokter
                    const namaPasien = doc.data().nama
                    const penyakit = mintaResep['namaP'].value
                    const obat = mintaResep['namaObat'].value

                    db.collection('dokter').where('nama', '==', dokter).get().then( function(snap){
                        snap.forEach(doc => {
                            const emailDokter = doc.data().email

                            db.collection('requestResep').doc(emailDokter).get().then((doc) =>{
                                let cemail = doc.data().email
                                let cpasien = doc.data().pasien
                                let cpenyakit = doc.data().penyakit
                                let cobat = doc.data().obat
                                
                                cemail.push(email)
                                cpasien.push(namaPasien)
                                cpenyakit.push(penyakit)
                                cobat.push(obat)
                    
                                db.collection('requestResep').doc(emailDokter).set({
                                    email : cemail,
                                    pasien : cpasien,
                                    penyakit : cpenyakit,
                                    obat : cobat
                                }, {merge : true}).then(() =>{
                                    alert('Permintaan terkirim')
                                    mintaResep.reset()
                                })
                            })
                        });
                    })
                })
            })
        } else {
          console.log('No user logged in')
        }
    });
}