export const exportToCSV = (dataToExport, filename) => {
    if (!dataToExport || dataToExport.length === 0) {
        return alert("No data available to export.");
    }

    const allKeys = new Set();
    dataToExport.forEach(item => Object.keys(item).forEach(key => allKeys.add(key)));
    const originalHeaders = Array.from(allKeys);

    const timestampFields = ['createdAt', 'updatedAt', 'submittedAt', 'checkIn', 'checkOut', 'deadline', 'loginTime', 'logoutTime'];

    const formatISTDate = (val) => {
        if (!val) return { dateStr: '', timeStr: '' };
        const d = new Date(val);
        if (isNaN(d.getTime())) return { dateStr: String(val), timeStr: '' };

        const dateOptions = { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' };
        const timeOptions = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true };

        const datePart = d.toLocaleDateString('en-GB', dateOptions).replace(/ /g, '-');
        let timePart = d.toLocaleTimeString('en-US', timeOptions);

        // Only leave time blank if it genuinely does not contain a time component
        if (typeof val === 'string' && !val.includes('T') && !val.includes(':')) {
            timePart = '';
        }

        return { dateStr: datePart, timeStr: timePart };
    };

    const headers = [];
    originalHeaders.forEach(header => {
        if (timestampFields.includes(header)) {
            let prefix = header.endsWith('At') ? header.replace('At', '') : header;
            prefix = prefix.endsWith('Time') ? prefix.replace('Time', '') : prefix;
            prefix = prefix.replace(/([A-Z])/g, ' $1').trim();
            const capitalizedPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
            headers.push(`${capitalizedPrefix} Date`);
            headers.push(`${capitalizedPrefix} Time`);
        } else {
            headers.push(header);
        }
    });

    const csvContent = [
        headers.join(','),
        ...dataToExport.map(row => {
            const rowValues = [];
            originalHeaders.forEach(header => {
                let cell = row[header];
                
                if (timestampFields.includes(header)) {
                     const { dateStr, timeStr } = formatISTDate(cell);
                     rowValues.push(`"${dateStr}"`);
                     rowValues.push(`"${timeStr}"`);
                } else {
                    if (cell === null || cell === undefined) cell = '';
                    else if (typeof cell === 'object') cell = JSON.stringify(cell);
                    else cell = String(cell);
                    rowValues.push(`"${cell.replace(/"/g, '""')}"`);
                }
            });
            return rowValues.join(',');
        })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
