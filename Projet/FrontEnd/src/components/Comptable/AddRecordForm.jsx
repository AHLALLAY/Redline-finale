function AddRecordForm(){
    return (
        <div>
            <form >
                <fieldset>
                    <div>
                        <label htmlFor="ref"></label>
                        <button>&times;</button>
                    </div>
                    <div>
                        <label htmlFor="lable">Libllé</label>
                        <input type="text" id="lable" />
                    </div>
                    <div>
                        <label htmlFor="amount">Montant</label>
                        <input type="number" id="amount"/>
                    </div>
                    <div>
                        <label htmlFor="ref">Reference</label>
                        <input type="text" id="ref"/>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}


export default AddRecordForm;