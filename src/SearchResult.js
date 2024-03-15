import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, where, query } from 'firebase/firestore/lite';

export default function SearchResult({db, setSearchTermField, searches, setSearches}) {

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
                    const result = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setSearchResult(result);

                    const updatedSearches = [searchTerm.trim().toLocaleLowerCase(), ...searches.slice(0, 12)]; // Limiting to 5 items
                    setSearches(updatedSearches);
                    localStorage.setItem('searchHistory', JSON.stringify(updatedSearches));
                } else {
                    setSearchResult({
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
                    searchResult.length > 0 ? (
                        searchResult.map((item, index) => (
                            <div key={index} dangerouslySetInnerHTML={{ __html: item.deskripsi }} />
                        ))
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: searchResult.deskripsi }} />
                    )
                ) : (
                    <div>Memuat...</div>
                ) 
            }
        </div>

    );
}