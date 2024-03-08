import React from "react";
import KBBILogo from "./kbbi_logo.png";

export default function DescApp() {
    return (
        <div>
            <div className="d-flex justify-content-center mb-2">
                <img src={KBBILogo} alt="Logo" className="kbbi-logo" />
            </div>
            <p>Aplikasi Kamus Besar Bahasa Indonesia (KBBI) online merupakan sebuah platform yang memudahkan pengguna untuk mencari dan memahami makna serta penggunaan kata-kata dalam bahasa Indonesia. Aplikasi ini adalah versi digital dari kamus klasik KBBI yang terkenal, memberikan akses instan dan praktis ke ribuan kata dan frasa dengan definisi yang lengkap dan akurat.</p>
            <p>Aplikasi KBBI online bertujuan memberikan kontribusi positif dalam memfasilitasi pemahaman dan penggunaan bahasa Indonesia yang baik dan benar, serta mendukung pengguna dalam memperkaya kosakata mereka.</p>
        </div>
    );
}