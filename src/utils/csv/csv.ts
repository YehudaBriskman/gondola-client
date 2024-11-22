export function stripBOM (buffer: string){
    if(buffer[0].toString().charCodeAt(0) === 0xFEFF){
        return buffer.slice(1)
    }
    return buffer
 }


class CSVError extends Error {
    message: string = "";
    constructor(message: string) {
        super()
        this.message = message
        Object.setPrototypeOf(this, CSVError.prototype)
    }
}

export default CSVError;