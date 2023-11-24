class Utils {
    static setLocalStorage(key: string, data: any) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }
    }

    static getLocalStorage(key: string): any {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data);
        return false;
    }
}

export { Utils };
