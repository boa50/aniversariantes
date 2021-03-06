const DateUtils = {
    getMonthNameFromNumber(mesNumero: number): string | undefined {
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

    getMesAtual(): number {
        const data = new Date();

        return data.getMonth() + 1;
    },

    getDiaAtual(): number {
        const data = new Date();

        return data.getDate();
    },

    getMes(data: Date): number {
        return data.getMonth() + 1;
    },

    getDia(data: Date): number {
        return data.getDate();
    },

    getDataCompleta(data: Date): string {
        return data.toLocaleDateString('en-GB');
    },
};

export default DateUtils;
