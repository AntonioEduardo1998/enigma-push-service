export function checkForDuplicates(array: string[]): boolean {
    return array.some((item, index) => {
        return array.indexOf(item) !== index;
    });
}