import * as XLSX from 'xlsx';
import Product from "./Product";

export default class ExcelAdapter {
    constructor(file) {
        this.file = file;
    }

    getProducts() {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetNameList = workbook.SheetNames;
                const productList = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]).map(product => {
                    return new Product(product.ProductID, product.ProductName, product.ProductPrice, product.Quantity);
                });
                resolve(productList);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(this.file);
        });
    }
}