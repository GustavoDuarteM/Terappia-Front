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
  const today = new Date(Date.now());
  const locate_today = today.toLocaleDateString("pt-BR");
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  const locate_tomorrow = tomorrow.toLocaleDateString("pt-BR");
  const esterday = new Date(today.setDate(today.getDate() - 1));
  const locate_esterday = esterday.toLocaleDateString("pt-BR");
  
  let message = "";
  switch (date.toLocaleDateString("pt-BR", { timeZone: "UTC" })) {
    case locate_today:
      message = "Hoje";
      break;
    case locate_tomorrow:
      message = "Amanha";
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