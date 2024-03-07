import React, { useEffect, useState } from 'react';
import { app } from './firebaseConfig';
import { getFirestore, collection, getDocs, where, query, limit } from 'firebase/firestore/lite';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BussinessMan from "./istockphoto-1474576599-1024x1024.png";
import KBBILogo from "./kbbi_logo.png";


const MyComponent = () => {

    const db = getFirestore(app);
    const [recomended, setRecomended] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState();

    useEffect(() => {

        const fetchData = async () => {
        try {
            const collectionRef = collection(db, 'kamus');
            const qry = query(collectionRef, limit(30));
            const querySnapshot = await getDocs(qry);
            const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRecomended(fetchedData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

    const handleSearchTerm = async () => {

        if (searchTerm.trim() === "") {
            setSearchResult(null);
            return;
        }

        try {
            const collectionRef = collection(db, 'kamus');
            const qry = query(collectionRef, where('term', '==', searchTerm.trim()));
            const querySnapshot = await getDocs(qry);

            if (!querySnapshot.empty) {
                const result = querySnapshot.docs[0].data();
                setSearchResult(result);
            } else {
                setSearchResult({
                    term : "",
                    deskripsi: `<p class="mb-0">Kata yang di cari <strong>${searchTerm}</strong></p><p>Maaf, kata <strong>${searchTerm}</strong> tidak dapat ditemukan.</p>`
                });
            }


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

  return (
    <div>
      <div class="container">
        <div class="row mt-5">
            <div class="col">
                <div class="row justify-content-center">
                    <div class="col-sm-6 col-src pe-sm-0">
                        <div class="general x-data-src">
                            <div class="row justify-content-center justify-content-sm-end">
                                <img src={BussinessMan} alt=".." class="image-carton-3d" />
                                <div class="col-sm-8 col-src">
                                    <div class="text-center">
                                        <h2>KAMUS BESAR BAHASA INDONESIA (KBBI)</h2>
                                        <h6>Kamus versi digital bisa diakses dari berbagai platform secara online</h6>
                                    </div>
                                    <div class="my-5">
                                        <div class="src-group d-flex">
                                            <input type="text" class="form-control d-inline-block" id="keyword" placeholder="Ketikkan kata yang dicari..." value={searchTerm} onChange={ (e) => setSearchTerm(e.target.value) } />
                                            <button type="button" class="btn btn-danger d-inline-block" onClick={handleSearchTerm}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                              </svg></button>
                                        </div>
                                    </div>                              
                                    <h6>Versi 1.1 update data terakhir : Januari 2024</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-5 col-res ps-sm-0">
                        <div class="general x-data-res">
                            {
                                searchResult && searchResult != null ? (
                                    <div dangerouslySetInnerHTML={{ __html: searchResult.deskripsi }} />
                                ) : (
                                    <div>
                                        <div class="d-flex justify-content-center mb-2">
                                            <img src={KBBILogo} alt="Logo" class="kbbi-logo" />
                                        </div>
                                        <p>Aplikasi Kamus Besar Bahasa Indonesia (KBBI) online merupakan sebuah platform yang memudahkan pengguna untuk mencari dan memahami makna serta penggunaan kata-kata dalam bahasa Indonesia. Aplikasi ini adalah versi digital dari kamus klasik KBBI yang terkenal, memberikan akses instan dan praktis ke ribuan kata dan frasa dengan definisi yang lengkap dan akurat.</p>
                                        <p>Aplikasi KBBI online bertujuan memberikan kontribusi positif dalam memfasilitasi pemahaman dan penggunaan bahasa Indonesia yang baik dan benar, serta mendukung pengguna dalam memperkaya kosakata mereka.</p>
                                    </div>
                                ) 
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-sm-11">
                <div class="col-suggest shadow-sm">
                    <div class="row">
                        <div class="col">
                            <h6 class="my-2">Rekomendasi kata</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            {
                                recomended.map((item, index) => (
                                    <p key={index} class="d-inline"><a href="#">{item.term}</a> </p>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="container-fluid">
        <div class="row mt-5">
            <div class="social-footer py-4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-sm-5">
                            <h5>Our Location</h5>
                            <p>Jl. Raya Lenteng No.45 Lenteng, Sumenep, Jawa Timur.</p>
                        </div>
                        <div class="col-sm-5">
                            <h5>Contact Us</h5>
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                              </svg> <a href="#">faisolofficial99@gmail.com</a></p>
                              <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                              </svg> <a href="#">@faisollarifin</a></p>
                              <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                              </svg> <a href="#">@faisollarifin</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="copyright-footer py-3">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-sm-10">
                            <p class="mb-0">Copyright &copy; 2024 digital kbbi by faisolarifin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </div>
  );
};

export default MyComponent;
