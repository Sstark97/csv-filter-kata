# CSV Filter
The proposal is a small program that filters data from a .csv file (comma-separated values) to return another .csv file.

It deals with a .csv containing invoice information. Each line is part of the data of an invoice, except for the first line,
which contains the names of the fields. As you can see in the slide, this would be an example of the file.

text


```text
Num _factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
2,03/08/2019,2000,2000,,8,MacBook Pro,,78544372A
3,03/12/2019,1000,2000,19,8, LenovoLaptop,,78544372A
```

# Requerimientos
- It is valid for some fields to be empty, appearing as two consecutive commas or a final comma.
- The invoice number cannot be repeated. If it is, all lines with repetition will be removed.
- The taxes VAT and IGIC are exclusive, meaning only one of the two can be applied. If any line has content in both fields, it must be excluded.
- The fields CIF and NIF are exclusive, only one of them can be used.
- The net amount is the result of applying the corresponding tax to the gross amount. If any net amount is not correctly calculated, the line will be excluded.