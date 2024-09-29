import { useEffect } from "react";
import Contact from "../../sections/Contact/Contact";

function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Contact />
  )
}

export default ContactPage;