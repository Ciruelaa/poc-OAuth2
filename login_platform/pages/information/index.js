import { useRouter } from "next/router";

export default function Information() {
  const router = useRouter();
  const userData = JSON.parse(router.query.data);
  const contacts = userData.contacts;

  // CSS
  const contactStyle = {
    paddingBottom: 15,
  };

  const contactList = contacts.map((contact, index) => {
    const contactCard = (
      <div style={contactStyle} key={contact + index}>
        <div>Nombre: {contact.name}</div>
        <div>Teléfono: {contact.number}</div>
      </div>
    );
    return contactCard;
  });

  return <div className="container">{contactList}</div>;
}
