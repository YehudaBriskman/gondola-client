declare global {
    module "*.png" {
        const value: string;
        export default value
    }
    module "*.module.css" {
        type ClassNames = {
            [ClassName: string]: string
        }
        const classNames: ClassNames;
        export default classNames
    }
    module "*.jpeg" {
        const value: string;
        export default value
    }
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production"
        }
    }
}

export { };