export class CsvFilter {
    static execute(bills: string[]): string[] {
        const fields: string[] = bills[1].split(",")
        if(fields[4] !== "" && fields[5] !== "") {
            return [bills[0]]
        }
        return bills
    }
}