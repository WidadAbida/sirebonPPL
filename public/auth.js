// Register Pasien
const registerPasien = document.querySelector("#registerPasien");

if(registerPasien){
    registerPasien.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = registerPasien[name = 'name'].value;
        const nik = registerPasien[name = 'NIK'].value;
        const email = registerPasien[name = 'email'].value;
        const psw = registerPasien[name = 'psw'].value;
        const notelp = registerPasien[name = 'notelp'].value;
        const dokter = registerPasien[name = 'dokter'].value;

        auth.createUserWithEmailAndPassword(email, psw).then( () =>{
            db.collection("pasien").doc(email).set({
                nama : nama,
                nik : nik,
                email : email,
                notelp : notelp,
                dokter : dokter
            }).then(() => {
                alert('User Registration Succesfull!');
                window.location.href='jadwal.html'
            })
        })
    });    
}


// Register Dokter
const registerDokter = document.querySelector("#registerDokter");

if(registerDokter){
    registerDokter.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = registerDokter[name = 'name'].value;
        const sip = registerDokter[name = 'SIP'].value;
        const email = registerDokter[name = 'email'].value;
        const psw = registerDokter[name = 'psw'].value;
        const notelp = registerDokter[name = 'notelp'].value;

        auth.createUserWithEmailAndPassword(email, psw).then( () => {
            db.collection("dokter").doc(email).set({
                nama : nama,
                sip : sip,
                email : email,
                notelp : notelp,
            }).then(() => {
                alert('User Registration Succesfull!');
                window.location.href='daftarpasien.html'
            })
        })       
    });    
}

// Login Pasien
const loginPasien = document.querySelector('#loginPasien')

if(loginPasien){
    loginPasien.addEventListener('submit', (e) =>{
        e.preventDefault();

        const email = loginPasien[name = 'email'].value;
        const psw = loginPasien[name = 'psw'].value;

        const docRef = db.collection("pasien").doc(email);

        docRef.get().then(function(doc){
            if(doc.exists){
                auth.signInWithEmailAndPassword(email, psw).then( () =>{
                    alert('Login Succesfull!');
                    window.location.href='jadwal.html'
                }) 
            }
            else{
                alert('User tidak ditemukan!');
                loginPasien.reset();
            }
        })    
    })    
}


// Login Dokter
const loginDokter = document.querySelector('#loginDokter')

if(loginDokter){
    loginDokter.addEventListener('submit', (e) =>{
        e.preventDefault();

        const email = loginDokter[name = 'email'].value;
        const psw = loginDokter[name = 'psw'].value;

        const docRef = db.collection("dokter").doc(email);

        docRef.get().then(function(doc){
            if(doc.exists){
                auth.signInWithEmailAndPassword(email, psw).then( () =>{
                    alert('Login Succesfull!');
                    window.location.href='daftarpasien.html'
                }) 
            }
            else{
                alert('User tidak ditemukan!');
                loginDokter.reset();
            }
        })    
    })    
}


// Logout
const logout = document.querySelector('#logout');
if(logout){
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            alert('Logout success')
            window.location.href='index.html'
        })
    })   
}