export class CsvFilter {
    static execute(bills: string[]): string[] {
        if(bills.length === 0){
            return bills;
        }
        const header = bills[0]
        const invoices = bills.slice(1);

        const result = invoices.filter(this.validateInvoice);

        return [header, ...result]
    }

    private static validateInvoice =  (bill: string) => {
        const fields: string[] = bill.split(",");
        const [gross, net, iva, igic, cif, nif] = [fields[2], fields[3], fields[4], fields[5], fields[7], fields[8] ?? ""]

        const tax = this.extractTax(iva, igic);
        const correctNet: number = this.calculateNet(tax, gross);

        return this.haveOnlyOneTax(iva, igic) &&
            this.haveOnlyOneIdentifier(cif, nif) &&
            Number(net) &&
            Number(gross) &&
            this.isNetCorrectly(net, correctNet);
    }

    private static isNetCorrectly(net: string, correctNet: number) {
        return Number(net) === correctNet;
    }

    private static calculateNet(tax: number, gross: string) {
        return (1 - (tax / 100)) * Number(gross);
    }

    private static extractTax(iva: string, igic: string) {
        return iva !== "" ? Number(iva) : Number(igic);
    }

    private static haveOnlyOneTax(iva: string, igic: string) {
        return iva !== "" && igic === "" && Number(iva) || igic !== "" && iva === "" && Number(igic);
    }
    private static haveOnlyOneIdentifier(cif: string, nif: string) {
        return cif !== "" && nif === "" || nif !== "" && cif === "";
    }
}