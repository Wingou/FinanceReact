export interface InputDateProps {
    name: string,
    value: string,
    handleFC: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface InputTextProps {
    name: string,
    placeholder: string,
    value: string,
    width?: string,
    handleFC: (e: React.ChangeEvent<HTMLInputElement>) => void
}
