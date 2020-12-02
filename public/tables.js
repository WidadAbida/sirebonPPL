// TODO :   Buat display tabel-tabel di daftarpasien, jadwal, requestresep
//          Munculin badge notif (berarti listener firestorenya disini ya)

// tabel jadwal
function renderJadwal(doc) {
    if(doc.exists){
        for(i=1;i<doc.data().obat.length;i++){
            let tr = document.createElement('tr')
            let nama = document.createElement('td')
            let minum = document.createElement('td')
            let sebses = document.createElement('td')
            let quantity = document.createElement('td')

            nama.innerText = doc.data().obat[i]
            minum.innerText = doc.data().frekuensi[i]
            sebses.innerText = doc.data().sebses[i]
            quantity.innerText = doc.data().quantity[i]
            
            tr.appendChild(nama)
            tr.appendChild(minum)
            tr.appendChild(sebses)
            tr.appendChild(quantity)

            jadwal.appendChild(tr)
        }
    }
}

//tabel requestResep
function renderRequestResep(doc) {
    if(doc.exists){
        for(i=0;i<doc.data().pasien.length;i++){
            let tr = document.createElement('tr')
            let pasien = document.createElement('td')
            let penyakit = document.createElement('td')
            let obat = document.createElement('td')
            let botantd = document.createElement('td')
            let botan = document.createElement('button')


            botan.className = 'delButton'
            botan.setAttribute('onclick', 'delRow(this)')
            botan.innerText = 'Done'

            pasien.innerText = doc.data().pasien[i]
            penyakit.innerText = doc.data().penyakit[i]
            obat.innerText = doc.data().obat[i]
            botantd.appendChild(botan)

            tr.appendChild(pasien)
            tr.appendChild(penyakit)
            tr.appendChild(obat)
            tr.appendChild(botantd)

            requestResep.appendChild(tr)
        }    
    }
    else{
        console.log('Document does not exist')
    }
}

//tabel tabelPasien
function renderTabelPasien(namaPasien, doc){
    for(i=1;i<doc.data().obat.length;i++){
        let tr = document.createElement('tr')
        let nama = document.createElement('td')
        let obat = document.createElement('td')
        let quantity = document.createElement('td')

        nama.innerText = namaPasien
        obat.innerText = doc.data().obat[i]
        quantity.innerText = doc.data().quantity[i] 
        
        tr.appendChild(nama)
        tr.appendChild(obat)
        tr.appendChild(quantity)

        daftarPasien.appendChild(tr)
    }
    
}
auth.onAuthStateChanged(function(user) {
    if (user) {
        const jadwal = document.querySelector('#jadwal')

        if(jadwal){
            const email = user.email

            db.collection('jadwal').doc(email).get().then( (doc) => {
                renderJadwal(doc)
            })
        }

        const requestResep = document.querySelector('#requestResep')

        if(requestResep){
            const email = user.email

            db.collection('requestResep').doc(email).get().then((doc) => {
                renderRequestResep(doc)
            })
        }

        const tabelPasien = document.querySelector('#tabelPasien')

        if(tabelPasien){
            const email = user.email

            db.collection('dokter').doc(email).get().then(function(doc){
                const namaDokter = doc.data().nama

                db.collection('jadwal').get().then((snap) => {
                    snap.forEach(doc => {
                        const emailPasien = doc.id
                        console.log(emailPasien)

                        db.collection('pasien').doc(emailPasien).get().then((pasien) => {
                            console.log(pasien.data().dokter, namaDokter)
                            if(pasien.data().dokter == namaDokter){
                                renderTabelPasien(pasien.data().nama, doc)
                            }
                        })
                    });
                })
            })
        }
    } else {
      console.log('No user logged in')
    }
});
