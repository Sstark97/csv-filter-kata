import {CsvFilter} from "../core/CsvFilter";

describe("CsvFilter", () => {
    it("should produce the same for a file with one correct bill", () => {
        const header: string = "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente"
        const bill: string = "1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,"

        expect(CsvFilter.execute([header, bill])).toStrictEqual([header, bill])
    })

    it("should remove a bill if IVA and IGIC field are both fill", () => {
        const header: string = "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente"
        const bill: string = "1,02/05/2019,1008,810,19,17,ACERLaptop,B76430134,"

        expect(CsvFilter.execute([header, bill])).toStrictEqual([header])
    })

    it("should remove a bill if CIF and NIF field are both fill", () => {
        const header: string = "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente"
        const bill: string = "1,02/05/2019,1008,810,,17,ACERLaptop,B76430134,34214567Z"

        expect(CsvFilter.execute([header, bill])).toStrictEqual([header])
    })

    it("should remove a bill if all taxes field are empty as one is required", () => {
        const header: string = "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente"
        const bill: string = "1,02/05/2019,1008,810,,,ACERLaptop,B76430134"

        expect(CsvFilter.execute([header, bill])).toStrictEqual([header])
    })
})