const MONTHS = [
  "Janeiro",
  "Favereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function format_date (date, type = 'short') {
  const today_time= new Date(Date.now()).setHours('00','00','00')
  const today = new Date(today_time);
  
  const locate_today = today.toLocaleDateString("pt-BR");
  
  let tomorrow = new Date(today.setDate(today.getDate() + 1));
  const locate_tomorrow = tomorrow.toLocaleDateString("pt-BR");
  
  let esterday = new Date(today.setDate(today.getDate() - 2));
  const locate_esterday = esterday.toLocaleDateString("pt-BR");
  
  let message = "";
  switch (date.toLocaleDateString("pt-BR", { timeZone: "UTC" })) {
    case locate_today:
      message = "Hoje";
      break;
    case locate_tomorrow:
      message = "Amanhã";
      break;
    case locate_esterday:
      message = "Ontem";
      break;
    default:
      if (type == 'long'){
        message = `Dia ${date.getDate()} de ${MONTHS[date.getMonth()]}`;
      } else {
        message = date.toLocaleDateString("pt-BR", { timeZone: "UTC" })
      }
      break;
  }
  return message;
}