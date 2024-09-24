import {CsvFilter} from "../core/CsvFilter";

describe("CsvFilter", () => {
    const header: string = "Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente"

    describe("with taxes", () => {
        it("should remove a invoice if IVA and IGIC field are both fill", () => {
            expect(CsvFilter.execute([header, anInvoiceWithOneLine({iva: "19", igic: "17"})])).toStrictEqual([header])
        })

        it("should remove a invoice if all taxes field are empty as one is required", () => {
            expect(CsvFilter.execute([header, anInvoiceWithOneLine({iva: ""})])).toStrictEqual([header])
        })

        it("should remove a invoice if any taxes are non decimal", () => {
            const invoiceWithIncorrectIva: string = anInvoiceWithOneLine({iva: "ITAX"})
            const invoiceWithIncorrectIgic: string = anInvoiceWithOneLine({invoiceId: "2", igic: "ITAX"})

            expect(CsvFilter.execute([header, invoiceWithIncorrectIva])).toStrictEqual([header])
            expect(CsvFilter.execute([header, invoiceWithIncorrectIgic])).toStrictEqual([header])
        })
    })

    it("should produce the same for a file with one correct invoice", () => {
        const invoice = anInvoiceWithOneLine({})
        expect(CsvFilter.execute([header, invoice])).toStrictEqual([header, invoice])
    })

    it("should remove a invoice if CIF and NIF field are both fill", () => {
        const invoice: string = anInvoiceWithOneLine({igic: "17", cif: "34214567Z"})

        expect(CsvFilter.execute([header, invoice])).toStrictEqual([header])
    })

    it("should remove a invoice if net amount is not calculated correctly", () => {
        const invoice: string = anInvoiceWithOneLine({net: "999"})

        expect(CsvFilter.execute([header, invoice])).toStrictEqual([header])
    })

    it("should give an empty invoice for an empty input", () => {
        expect(CsvFilter.execute([])).toStrictEqual([])
    })

    it("should give an error if a list of invoices with only one element", () => {
        expect(() => CsvFilter.execute([anInvoiceWithOneLine({})])).toThrow();
    })

    it('should allows only multiple correct lines', () => {
        const invoiceLine = anInvoiceWithOneLine({});
        const invoiceLine2 = anInvoiceWithOneLine({invoiceId: "2"});

        const result = CsvFilter.execute([header, invoiceLine, invoiceLine2]);

        expect(result).toEqual([header, invoiceLine, invoiceLine2]);
    })

    it("should drop all invoices with the same id", () => {
        const invoiceLine = anInvoiceWithOneLine({});
        const invoiceLine2 = anInvoiceWithOneLine({invoiceId: "2"});
        const invoiceLine3 = anInvoiceWithOneLine({});
        const invoiceLine4 = anInvoiceWithOneLine({invoiceId: "3"});
        const invoiceLine5 = anInvoiceWithOneLine({invoiceId: "4"});
        const invoiceLine6 = anInvoiceWithOneLine({invoiceId: "2"});
        const aListOfInvoices = [
            header,
            invoiceLine,
            invoiceLine2,
            invoiceLine3,
            invoiceLine4,
            invoiceLine5,
            invoiceLine6
        ];

        const result = CsvFilter.execute(aListOfInvoices);

        expect(result).toEqual([header, invoiceLine4, invoiceLine5]);
    })

    interface FileWithOneInvoiceLineHavingParams {
        invoiceId?: string
        iva?: string;
        igic?: string;
        net?: string;
        cif?: string;
    }

    const anInvoiceWithOneLine= ({
                                     invoiceId = "1",
                                     iva = "21",
                                     igic = "",
                                     net = "796.32",
                                     cif = ""
                                 }: FileWithOneInvoiceLineHavingParams) => {
        const invoiceDate = "02/05/2019";
        const gross = "1008";
        const concept = "ACERLaptop";
        const nif = "B76430134";
        return [invoiceId, invoiceDate, gross, net, iva, igic, concept, nif, cif].join(",");
    };
})