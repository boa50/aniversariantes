const aniversariantes = [
    { pessoa: 'ÂNGELO (neto de Carlinhos)', mes: '1', dia: '02' },
    { pessoa: 'ABELARDINHO', mes: '1', dia: '04' },
    { pessoa: 'KHIVIA', mes: '1', dia: '05' },
    { pessoa: 'RAFAELA (neta de Carlinhos)', mes: '1', dia: '05' },
    { pessoa: 'VICTOR', mes: '1', dia: '05' },
    { pessoa: 'VALDIRIA', mes: '1', dia: '06' },
    { pessoa: 'MARINA', mes: '1', dia: '12' },
    { pessoa: 'LETICIA', mes: '1', dia: '19' },
    { pessoa: 'PAPAI (in memorian)', mes: '1', dia: '19' },
    { pessoa: 'CARLINHOS (Neto de Carlinhos)', mes: '1', dia: '27' },
    { pessoa: 'IAGO', mes: '1', dia: '28' },
    { pessoa: 'MATHEUS', mes: '1', dia: '28' },
    { pessoa: 'BEATRIZ', mes: '2', dia: '07' },
    { pessoa: 'ADENILDE', mes: '2', dia: '12' },
    { pessoa: 'RAFAEL (Neto de Carlinhos)', mes: '2', dia: '12' },
    { pessoa: 'MARICI', mes: '2', dia: '15' },
    { pessoa: 'RÔMULO', mes: '2', dia: '21' },
    { pessoa: 'MIÃO', mes: '2', dia: '22' },
    { pessoa: 'LARA (neta de Carlinhos)', mes: '2', dia: '23' },
    { pessoa: 'GUILHERME', mes: '2', dia: '27' },
    { pessoa: 'Pedrinho (tio Abelardo)', mes: '3', dia: '06' },
    { pessoa: 'Chiquinho', mes: '3', dia: '18' },
    { pessoa: 'Ana Sofia', mes: '3', dia: '19' },
    { pessoa: 'Vinicius', mes: '3', dia: '20' },
    { pessoa: 'Idyla', mes: '3', dia: '22' },
    { pessoa: 'Jussara', mes: '3', dia: '22' },
    { pessoa: 'Kinka', mes: '3', dia: '29' },
    { pessoa: 'CLARINHA', mes: '4', dia: '05' },
    { pessoa: 'KARLINHA', mes: '4', dia: '05' },
    { pessoa: 'BERNARDO', mes: '4', dia: '09' },
    { pessoa: 'LUCIA', mes: '4', dia: '09' },
    { pessoa: 'MARIANNE (nora Carlinhos)', mes: '4', dia: '10' },
    { pessoa: 'IGUINHO (meu netinho)', mes: '4', dia: '12' },
    { pessoa: 'SHEILA', mes: '4', dia: '12' },
    { pessoa: 'BILO', mes: '4', dia: '19' },
    { pessoa: 'IGOR', mes: '4', dia: '19' },
    { pessoa: 'PEDRO ALEXANDRE (Neto de Carlinhos)', mes: '4', dia: '19' },
    { pessoa: 'BERTA', mes: '4', dia: '21' },
    { pessoa: 'JOANA KARLA (neta Carlinhos)', mes: '4', dia: '24' },
    { pessoa: 'LITINHA', mes: '4', dia: '28' },
    { pessoa: 'FELIPE', mes: '5', dia: '01' },
    { pessoa: 'TALLES', mes: '5', dia: '01' },
    { pessoa: 'DENIS', mes: '5', dia: '07' },
    { pessoa: 'RENATA', mes: '5', dia: '08' },
    { pessoa: 'ARTHUR', mes: '5', dia: '09' },
    { pessoa: 'SOPHIA (neta de Carlinhos)', mes: '5', dia: '09' },
    { pessoa: 'FABYANA', mes: '5', dia: '19' },
    { pessoa: 'ALINE', mes: '5', dia: '24' },
    { pessoa: 'MAÍRA', mes: '6', dia: '02' },
    { pessoa: 'ALEXANDRE (genro de Carlinhos)', mes: '6', dia: '19' },
    { pessoa: 'MAITÊ', mes: '6', dia: '21' },
    { pessoa: 'TIAGO (filho de Bernardo)', mes: '6', dia: '28' },
    { pessoa: 'ABELARDO', mes: '7', dia: '07' },
    { pessoa: 'CARLINHOS', mes: '7', dia: '11' },
    { pessoa: 'JUNINHO DE BERTA', mes: '7', dia: '15' },
    { pessoa: 'JULIANA', mes: '7', dia: '17' },
    { pessoa: 'PEZE', mes: '7', dia: '17' },
    { pessoa: 'ALAM (genro de Carlinhos)', mes: '7', dia: '17' },
    { pessoa: 'LUQUINHAS (meu netinho)', mes: '7', dia: '21' },
    { pessoa: 'JULIA KARLA (Neta de Carlinhos)', mes: '8', dia: '04' },
    { pessoa: 'BENJAMIN (Neto de Carlinhos)', mes: '8', dia: '10' },
    { pessoa: 'MARIA CLARA (FIlha de Abelardinho)', mes: '8', dia: '12' },
    { pessoa: 'NATÁLIA', mes: '8', dia: '17' },
    { pessoa: 'CICI (in memorian)', mes: '8', dia: '19' },
    { pessoa: 'ANDRÉ (Esposo de Marici)', mes: '8', dia: '25' },
    { pessoa: 'DIEGO', mes: '9', dia: '01' },
    { pessoa: 'JULIANA', mes: '9', dia: '05' },
    { pessoa: 'PEDRO HENRIQUE', mes: '9', dia: '08' },
    { pessoa: 'SABRINA (neta de Carlinhos)', mes: '9', dia: '08' },
    { pessoa: 'LUANA', mes: '9', dia: '11' },
    { pessoa: 'RUTH', mes: '9', dia: '11' },
    { pessoa: 'ARTHURZINHO', mes: '9', dia: '16' },
    { pessoa: 'MANINHO', mes: '9', dia: '16' },
    { pessoa: 'LARA', mes: '9', dia: '17' },
    { pessoa: 'EDUARDO (genro de Carlinhos)', mes: '9', dia: '20' },
    { pessoa: 'VANESSA', mes: '9', dia: '20' },
    { pessoa: 'CARMEM', mes: '10', dia: '01' },
    { pessoa: 'DAISY', mes: '10', dia: '03' },
    { pessoa: 'MILLA', mes: '10', dia: '04' },
    { pessoa: 'LUCIO JR.', mes: '10', dia: '08' },
    { pessoa: 'MAMÃE IRACY (in memorian)', mes: '10', dia: '08' },
    { pessoa: 'BRUNO', mes: '10', dia: '14' },
    { pessoa: 'FLÁVIA', mes: '10', dia: '19' },
    { pessoa: 'MIRELLA', mes: '10', dia: '21' },
    { pessoa: 'LUCAS ALEXANDRE (Neto de Carlinhos)', mes: '11', dia: '01' },
    { pessoa: 'PEDRINHO FILHO', mes: '11', dia: '03' },
    { pessoa: 'MELISSA (neta de Carlinhos)', mes: '11', dia: '07' },
    { pessoa: 'FABIANA', mes: '11', dia: '09' },
    { pessoa: 'RAQUEL', mes: '11', dia: '12' },
    { pessoa: 'RODRIGO', mes: '11', dia: '18' },
    { pessoa: 'VINICIUS (Neto de Carlinhos)', mes: '11', dia: '24' },
    { pessoa: 'TARCISIO', mes: '11', dia: '25' },
    { pessoa: 'DANIELA', mes: '11', dia: '26' },
    { pessoa: 'HENRIQUE (meu netinho)', mes: '12', dia: '02' },
    { pessoa: 'MARÍLIA', mes: '12', dia: '02' },
    { pessoa: 'MARIA JOSÉ', mes: '12', dia: '03' },
    { pessoa: 'KAUAN', mes: '12', dia: '16' },
    { pessoa: 'LUCINHO', mes: '12', dia: '21' },
    { pessoa: 'NETINHA (filha de Bernardo)', mes: '12', dia: '24' },
    { pessoa: 'LARISSA', mes: '12', dia: '26' },
];

export default aniversariantes;
