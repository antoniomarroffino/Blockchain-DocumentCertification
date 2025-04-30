export function formatAddress(address?: string, startLength = 6, endLength = 4): string {
    if (!address) return '';
    if (address.length <= startLength + endLength + 2) return address;

    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}
