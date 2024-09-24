import {CsvFilter} from "../core/CsvFilter";

describe("CsvFilter", () => {
    const header: string = "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente"

    describe("with taxes", () => {
        it("should remove a invoice if IVA and IGIC field are both fill", () => {
            expect(CsvFilter.execute([header, anInvoiceWithOneLine("19", "17")])).toStrictEqual([header])
        })

        it("should remove a invoice if all taxes field are empty as one is required", () => {
            expect(CsvFilter.execute([header, anInvoiceWithOneLine("", "")])).toStrictEqual([header])
        })

        it("should remove a invoice if any taxes are non decimal", () => {
            const invoiceWithIncorrectIva: string = anInvoiceWithOneLine("ITAX", "")
            const invoiceWithIncorrectIgic: string = anInvoiceWithOneLine("", "ITAX")

            expect(CsvFilter.execute([header, invoiceWithIncorrectIva])).toStrictEqual([header])
            expect(CsvFilter.execute([header, invoiceWithIncorrectIgic])).toStrictEqual([header])
        })
    })

    it("should produce the same for a file with one correct invoice", () => {
        const invoice = anInvoiceWithOneLine("21", "")
        expect(CsvFilter.execute([header, invoice])).toStrictEqual([header, invoice])
    })

    it("should remove a invoice if CIF and NIF field are both fill", () => {
        const invoice: string = anInvoiceWithOneLine("", "17")

        expect(CsvFilter.execute([header, `${invoice},34214567Z`])).toStrictEqual([header])
    })

    it("should remove a invoice if net amount is not calculated correctly", () => {
        const invoice: string = anInvoiceWithOneLine("", "")

        expect(CsvFilter.execute([header, invoice])).toStrictEqual([header])
    })

    const anInvoiceWithOneLine = (iva: string, igic: string) => {
        const invoiceId = "1";
        const invoiceDate = "02/05/2019";
        const gross = "1008";
        const net = "796.32";
        const concept = "ACERLaptop";
        const clientId = "B76430134";
        return [invoiceId,invoiceDate,gross,net,iva,igic,concept,clientId].join(",");
    };
})