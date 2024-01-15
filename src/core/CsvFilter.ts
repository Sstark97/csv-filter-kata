export class CsvFilter {
    static execute(bills: string[]): string[] {
        const fields: string[] = bills[1].split(",")
        if(this.bothTaxesAreFill(fields[4], fields[5])) {
            return [bills[0]]
        }
        return bills
    }

    private static bothTaxesAreFill(iva: string, igic: string) {
        return iva !== "" && igic !== "";
    }
}