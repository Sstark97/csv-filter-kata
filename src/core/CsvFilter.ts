export class CsvFilter {
    static execute(bills: string[]): string[] {
        const fields: string[] = bills[1].split(",")
        const [gross, net, iva, igic, cif, nif] = [fields[2], fields[3], fields[4], fields[5], fields[7], fields[8] ?? ""]

        if(this.taxFieldsAreExclusive(iva, igic) || this.bothIdentifiersAreFill(cif, nif)) {
            return [bills[0]]
        }
        if(isNaN(Number(net)) || isNaN(Number(gross))) {
            return [bills[0]]
        }
        const tax = this.extractTax(iva, igic)
        const correctNet: number = this.calculateNet(tax, gross)


        if(Number(net) !== correctNet) {
            return [bills[0]]
        }
        return bills
    }

    private static calculateNet(tax: number, gross: string) {
        return (1 - (tax / 100)) * Number(gross);
    }

    private static extractTax(iva: string, igic: string) {
        return iva !== "" ? Number(iva) : Number(igic);
    }

    private static taxFieldsAreExclusive(iva: string, igic: string) {
        return this.bothTaxesAreFill(iva, igic) || this.bothTaxesAreEmpty(iva, igic) || isNaN(Number(iva)) || isNaN(Number(igic));
    }

    private static bothTaxesAreEmpty(iva: string, igic: string) {
        return iva === "" && igic === "";
    }

    private static bothIdentifiersAreFill(cif: string, nif: string) {
        return cif !== "" && nif !== "";
    }

    private static bothTaxesAreFill(iva: string, igic: string) {
        return iva !== "" && igic !== "";
    }
}