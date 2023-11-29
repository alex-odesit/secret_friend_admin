class Utils {
    static setLocalStorage(key: string, data: any) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }
    }

    static copy(data: any): any {
        return JSON.parse(JSON.stringify(data));
    }

    static getLocalStorage(key: string): any {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data);
        return false;
    }

    static encryptSubstitution(str: string) {
        // Пример простого шифра подстановки
        const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
        const encryptedChars: string = 'xyzabcdefghijklmnopqrstuvw';

        return str.replace(/[a-z]/g, char => {
            const index = alphabet.indexOf(char);
            return index >= 0 ? encryptedChars[index] : char;
        });
    }

    static decryptSubstitution(str: string) {
        // Пример дешифра подстановки
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const encryptedChars = 'xyzabcdefghijklmnopqrstuvw';

        return str.replace(/[a-z]/g, char => {
            const index = encryptedChars.indexOf(char);
            return index >= 0 ? alphabet[index] : char;
        });
    }
}

export { Utils };
