import FooterGlobal from "../Global/FooterGlobal";

function Footer() {
    return (
        <div>
            <div>
                <div>
                    {/* Logo */}
                    <div>
                        <span>Ω</span>
                        <h1>
                            OMEGA SCHOOL
                        </h1>
                    </div>
                    <div>
                        <h2>Lien Rapid</h2>
                        <ul>
                            <li><a href="#propos"></a>À propos</li>
                            <li><a href="#offres"></a>Nos Offres</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <FooterGlobal />
            </div>
        </div>
    );
}

export default Footer;