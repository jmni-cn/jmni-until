export const generateUID = (): string => {
    const timestamp = Date.now().toString(36)
    const randomPart = Math.random().toString(36).substring(2, 10)
    return timestamp + randomPart;
}
