import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchField({searchTermField, setSearchTermField}) {

    const navigate = useNavigate();

    const handleSearchTerm = e => {
        e.preventDefault();
        navigate(searchTermField);        
    }
    const handleClearTerm = () => {
        setSearchTermField("");
        navigate("");
    } 

    return (
        <div className="my-5">
            <form onSubmit={handleSearchTerm} className="src-group d-flex">
                <input type="text" className="form-control d-inline-block" id="keyword" placeholder="Ketikkan kata yang dicari..." value={searchTermField} onChange={ (e) => setSearchTermField(e.target.value) } />
                
                { searchTermField && searchTermField != "" ? (
                    <button className="btn px-2 btn-clear" onClick={handleClearTerm}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </button>
                ) : (
                    <div></div>
                ) }
                <button type="submit" className="btn btn-danger d-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg></button>
            </form>
        </div> 
    );
}