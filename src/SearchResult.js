import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, where, query } from 'firebase/firestore/lite';
import DescApp from "./DescApp";

export default function SearchResult({db, setSearchTermField}) {

    let { searchTerm } = useParams();
    const [searchResult, setSearchResult] = useState();

    useEffect(() => {

        setSearchTermField(searchTerm);

        if (searchTerm.trim() === "") {
            setSearchResult(null);
            return;
        }

        const searchData = async () => {
            try {
                const collectionRef = collection(db, 'kamus');
                const qry = query(collectionRef, where('term', '==', searchTerm.trim().toLocaleLowerCase()));
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

        searchData();

    }, [searchTerm]);


    return (
        <div>
            {
                searchResult && searchResult != null ? (
                    <div dangerouslySetInnerHTML={{ __html: searchResult.deskripsi }} />
                ) : (
                    <div>Memuat...</div>
                ) 
            }
        </div>

    );
}