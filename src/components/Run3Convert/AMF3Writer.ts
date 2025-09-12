// Really simple AMF3 Writer, no XML support
export class AMF3Writer {
    private static readonly UNDEFINED = 0x00;
    private static readonly NULL = 0x01;
    private static readonly FALSE = 0x02;
    private static readonly TRUE = 0x03;
    private static readonly INTEGER = 0x04;
    private static readonly DOUBLE = 0x05;
    private static readonly STRING = 0x06;
    private static readonly XML_DOC = 0x07;
    private static readonly DATE = 0x08;
    private static readonly ARRAY = 0x09;
    private static readonly OBJECT = 0x0a;
    private static readonly XML = 0x0b;
    private static readonly BYTE_ARRAY = 0x0c;

    private buffer: number[] = [];
    private stringTable: string[] = [];

    public writeValue(value: any): void {
        if (value === undefined) {
            this.buffer.push(AMF3Writer.UNDEFINED);
        } else if (value === null) {
            this.buffer.push(AMF3Writer.NULL);
        } else if (value === false) {
            this.buffer.push(AMF3Writer.FALSE);
        } else if (value === true) {
            this.buffer.push(AMF3Writer.TRUE);
        } else if (typeof value === "number") {
            if (Number.isInteger(value) && value >= -268435456 && value <= 268435455) {
                this.buffer.push(AMF3Writer.INTEGER);
                this.writeU29(value & 0x1fffffff);
            } else {
                this.buffer.push(AMF3Writer.DOUBLE);
                this.writeDouble(value);
            }
        } else if (typeof value === "string") {
            this.buffer.push(AMF3Writer.STRING);
            this.writeString(value);
        }
    }

    private writeU29(value: number): void {
        if (value < 0x80) {
            this.buffer.push(value);
        } else if (value < 0x4000) {
            this.buffer.push(((value >> 7) & 0x7f) | 0x80);
            this.buffer.push(value & 0x7f);
        } else if (value < 0x200000) {
            this.buffer.push(((value >> 14) & 0x7f) | 0x80);
            this.buffer.push(((value >> 7) & 0x7f) | 0x80);
            this.buffer.push(value & 0x7f);
        } else {
            this.buffer.push(((value >> 22) & 0x7f) | 0x80);
            this.buffer.push(((value >> 15) & 0x7f) | 0x80);
            this.buffer.push(((value >> 8) & 0x7f) | 0x80);
            this.buffer.push(value & 0xff);
        }
    }

    private writeDouble(value: number): void {
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setFloat64(0, value, false); // big-endian

        for (let i = 0; i < 8; i++) {
            this.buffer.push(view.getUint8(i));
        }
    }

    private writeString(value: string): void {
        if (value === "") {
            this.writeU29(1);
            return;
        }

        const index = this.stringTable.indexOf(value);
        if (index !== -1) {
            this.writeU29(index << 1);
            return;
        }

        this.stringTable.push(value);
        const utf8Bytes = new TextEncoder().encode(value);
        this.writeU29((utf8Bytes.length << 1) | 1);
        this.buffer.push(...utf8Bytes);
    }


    public createSOL(name: string, data: any): Uint8Array {    
        this.buffer = [];
        this.stringTable = [];

        this.buffer.push(0x00, 0xbf)
        this.buffer.push(0x00, 0x00, 0x00, 0x00)
        this.buffer.push(0x54, 0x43, 0x53, 0x4F, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00)
        this.buffer.push((name.length >> 8) & 0xff);
        this.buffer.push(name.length & 0xff);       
        const encodedName = new TextEncoder().encode(name);
        this.buffer.push(...encodedName);
        this.buffer.push(0x00, 0x00, 0x00)
        this.buffer.push(0x03)

        for (const [key, value] of Object.entries(data)) {
            this.writeString(key)
            this.writeValue(value)
            this.buffer.push(0x00)
        }

        const result = new Uint8Array(this.buffer);

        const dataLength = result.length - 6;
        result[2] = (dataLength >> 24) & 0xff;
        result[3] = (dataLength >> 16) & 0xff;
        result[4] = (dataLength >> 8) & 0xff;
        result[5] = dataLength & 0xff;

        return result;
    }

    public createDownloadableSOL(filename: string, solName: string, data: any): void {
        const solData = this.createSOL(solName, data);
        const blob = new Blob([solData], { type: "application/octet-stream" });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename.endsWith(".sol") ? filename : `${filename}.sol`;
        link.click();

        URL.revokeObjectURL(url);
    }
}
