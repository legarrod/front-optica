
export default function getDate(date) {
	const f = new Date(date);

let diaSemana = f.getDay(); // 2 (Martes)
let dia = f.getDate(); // 30
let mes = f.getMonth() + 1; // 0 (Enero)
let year = f.getFullYear(); // 2018
f.getHours(); // 15
f.getMinutes(); // 30
f.getSeconds(); // 10
f.getMilliseconds(); // 999
f.getTimezoneOffset(); // 0
f.getTime(); // 1517326210999 (Tiempo Unix)

	let month =(month)=>{
		switch (month) {
			case 0:
				 return "Enero"
				break;
			case 1:
				return "Febrero"
				break;
			case 2:
				return "Marzo"
				break;
			case 3:
				return "Abril"
				break;
			case 4:
				return "Mayo"
				break;
			case 5:
				return "Junio"
				break;
			case 6:
				return "Julio"
				break;
			case 7:
				return "Agosto"
				break;
			case 8:
				return "Septiembre"
				break;
			case 9:
				return "Octubre"
				break;
			case 10:
				return "Noviembre"
				break;
			case 11:
				return "Diciembre"
				break;
			default:
				break;
		}
	}

	return `${year}-${mes}-${dia}`;
}

export function getHour(date) {
	const f = new Date(date);

let diaSemana = f.getDay(); // 2 (Martes)
let dia = f.getDate(); // 30
let mes = f.getMonth() + 1; // 0 (Enero)
let year = f.getFullYear(); // 2018
let hora = f.getHours(); // 15
let minuto = f.getMinutes(); // 30
f.getSeconds(); // 10
f.getMilliseconds(); // 999
f.getTimezoneOffset(); // 0
f.getTime(); // 1517326210999 (Tiempo Unix)

	return `${hora}:${minuto}`;
}