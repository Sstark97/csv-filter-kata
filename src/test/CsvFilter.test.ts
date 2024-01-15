import {CsvFilter} from "../core/CsvFilter";

describe("CsvFilter", () => {
    it("should produce the same for a file with one correct bill", () => {
        const bills: string =
            "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n" +
            "1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,"

        expect(CsvFilter.execute(bills)).toBe(bills)
    })

    it("should remove a bill if IVA and IGIC field are both fill", () => {
        const bills: string =
            "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n" +
            "1,02/05/2019,1008,810,19,17,ACERLaptop,B76430134,"

        expect(CsvFilter.execute(bills)).toBe("Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente\n")
    })
})