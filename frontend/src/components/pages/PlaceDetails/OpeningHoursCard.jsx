import Card from "./Card";

export function OpeningHoursCard({
  daysOfWeek,
  openingHours,
  closingHours,
  formatHours,
}) {
  return (
    <Card className="mb-6">
      <h2 className="text-xl text-[#282c34] font-bold mb-3 flex items-center gap-2">
        🕒 <span>Opening Hours</span>
      </h2>
      <table className="w-full text-gray-600">
        <tbody>
          {daysOfWeek.map((day, index) => (
            <tr key={day} className="border-b last:border-b-0">
              <td className="py-2 font-medium">{day}</td>
              <td className="py-2 text-right">
                {formatHours(openingHours?.[index], closingHours?.[index])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default OpeningHoursCard;
