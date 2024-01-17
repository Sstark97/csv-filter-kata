export class CsvFilter {
    static execute(bills: string[]): string[] {
        const fields: string[] = bills[1].split(",")
        const [iva, igic, cif, nif] = [fields[4], fields[5], fields[7], fields[8]]
        if(this.bothTaxesAreFill(iva, igic) || this.bothIdentifiersAreFill(cif, nif)) {
            return [bills[0]]
        }
        return bills
    }

    private static bothIdentifiersAreFill(cif: string, nif: string) {
        return cif !== "" && nif !== "";
    }

    private static bothTaxesAreFill(iva: string, igic: string) {
        return iva !== "" && igic !== "";
    }
}