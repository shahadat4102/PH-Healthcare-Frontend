


export function formatFileSize(bytest: number) {
    if(bytest < 1024 * 1024) {
        return `${(bytest /1024).toFixed(0)}KB`;
    }

    return  `${(bytest /1024).toFixed(1)}MD`;
}