import React from 'react';

function Footer() {
    return (
        <div>
            <footer className="dark text-center text-lg-start shadow">
                <div className="text-center p-3">
                    &copy; HadidMebel 2016 | Barcha huquqlar himoyalangan
                    | Bizni ijtimoiy tarmoqlarda kuzatib boring
                    <a className={"text-light ms-2"} href={"https://instagram.com/hadidmebel"}><i className={"bi bi-instagram"}></i></a>
                    <a className={"text-light ms-2"} href={"https://tiktok.com/hadidmebel"}><i className={"bi bi-tiktok"}></i></a>
                    <a className={"text-light ms-2"} href={"https://facebook.com/hadidmebel"}><i className={"bi bi-facebook"}></i></a>
                    <a className={"text-light ms-2"} href={"https://t.me/hadidmebel"}><i className={"bi bi-telegram"}></i></a>
                </div>
            </footer>
        </div>
    );
}

export default Footer;