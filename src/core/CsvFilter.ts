export class CsvFilter {
    static execute(bills: string[]): string[] {
        if(bills.length === 0){
            return [];
        }
        if (bills.length === 1) {
            throw new Error("Single line it's not allowed")
        }

        const header = bills[0]
        const invoices = bills.slice(1);

        return [header].concat(this.filterRepeatedOf(this.takeValidInvoices(invoices)))
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

    private static takeValidInvoices = (invoices: string[]) => {
        return invoices.filter(this.validateInvoice);
    }

    private static filterRepeatedOf(aListOfInvoices: string[]) {
        const invoicesIds = aListOfInvoices.map(bill => this.takeInvoiceId(bill));
        const repeatedInvoices = invoicesIds.filter(((bill, index, self) => self.indexOf(bill) !== index));
        return aListOfInvoices.filter(bill => !repeatedInvoices.includes(this.takeInvoiceId(bill)));
    }

    private static takeInvoiceId = (bill: string) => {
        return bill.split(",").shift();
    }
}