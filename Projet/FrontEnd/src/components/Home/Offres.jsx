function Offres() {
    const offres = [
        {
            id: 1,
            titre: "Professeur de Français",
            type: "CDD",
            duree: "1 an"
        },
        {
            id: 2,
            titre: "Stage en Mathématiques",
            type: "Stage",
            duree: "6 mois"
        }
    ];
    return (
        <section>
            <div>
                {/* section title */}
                <h2>Offres</h2>
                {/* cards */}
                <div>
                    {offres.map(off => (
                        <div>
                            <div>
                                <h3>{off.titre}</h3>
                                <p>Type: {off.type}</p>
                                <p>Durée: {off.duree}</p>
                            </div>
                            <div>
                                <button>Postuler</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Offres