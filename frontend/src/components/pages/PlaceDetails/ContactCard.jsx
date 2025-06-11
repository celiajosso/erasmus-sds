import Card from "./Card";

export function ContactCard({ phone, email, website, instagram }) {
  const hasAnyContact = phone || email || website || instagram;

  if (!hasAnyContact) return null;

  return (
    <>
      <h2 className="text-xl text-gray-800 dark:text-white font-bold mb-3 flex items-center gap-2">
        📞 <span>Contact</span>
      </h2>
      <Card className="mb-6">
        <ul className="text-gray-600 leading-relaxed space-y-2">
          {phone && (
            <li>
              <strong>Phone:</strong> {phone}
            </li>
          )}
          {email && (
            <li>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${email}`}
                className="text-blue-600 hover:underline"
              >
                {email}
              </a>
            </li>
          )}
          {website && (
            <li>
              <strong>Website:</strong>{" "}
              <a
                href={`https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {website}
              </a>
            </li>
          )}
          {instagram && (
            <li>
              <strong>Instagram:</strong>{" "}
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                @{instagram}
              </a>
            </li>
          )}
        </ul>
      </Card>
    </>
  );
}

export default ContactCard;
