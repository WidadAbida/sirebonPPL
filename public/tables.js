// TODO :   Buat display tabel-tabel di daftarpasien, jadwal, requestresep
//          Munculin badge notif (berarti listener firestorenya disini ya)


// tabel jadwal



let currentUser
auth.onAuthStateChanged(function(user) {
    if (user) {
        const jadwal = document.querySelector('#jadwal')

        if(jadwal){
            const email = user.email

            db.collection('jadwal').doc(email).get().then(function(doc) {
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
                else{
                    
                }
            })
        }
    } else {
      console.log('No user logged in')
    }
});

