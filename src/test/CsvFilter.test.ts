class CsvFilter {
    static execute(bills: string): string {
        return ""
    }
}

describe("CsvFilter", () => {
    it("should produce the same for a file with one correct bill", () => {
        const bills: string =
            "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n" +
            "1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,"

        expect(CsvFilter.execute(bills)).toBe(bills)
    })
})