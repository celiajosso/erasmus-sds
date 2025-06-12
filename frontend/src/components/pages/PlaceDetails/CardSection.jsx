import Card from "./Card";

export function CardSection({ icon, title, children, className }) {
  return (
    <Card className={className}>
      <h2 className="text-xl text-[#282c34] dark:text-white font-bold mb-3 flex items-center gap-2">
        <span>{icon}</span> <span>{title}</span>
      </h2>
      <div className="text-gray-600 dark:text-gray-400 leading-relaxed">{children}</div>
    </Card>
  );
}

export default CardSection;
