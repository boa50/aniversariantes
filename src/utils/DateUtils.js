const DateUtils = {
    getMonthNameFromNumber(mesNumero) {
        switch (mesNumero) {
            case 1:
                return 'Janeiro';
            case 2:
                return 'Fevereiro';
            case 3:
                return 'Março';
            case 4:
                return 'Abril';
            case 5:
                return 'Maio';
            case 6:
                return 'Junho';
            case 7:
                return 'Julho';
            case 8:
                return 'Agosto';
            case 9:
                return 'Setembro';
            case 10:
                return 'Outubro';
            case 11:
                return 'Novembro';
            case 12:
                return 'Dezembro';
            default:
                return;
        }
    },

    getMesAtual() {
        const data = new Date();
        
        return data.getMonth() + 1; 
    },

    isDataDoMes(data, mesNumero) {
        const mesData = data.substring(3,5);
        
        return Number(mesData) === Number(mesNumero);
    },

    getMesesNumeros() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    },

    getDiaFromString(data) {
        return data.substring(0,2);
    }
}

export default DateUtils;