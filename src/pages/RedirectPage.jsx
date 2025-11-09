// RedirectPage.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RedirectPage() {
  const { code } = useParams();

  useEffect(() => {
    // Chuyển hướng thẳng tới BE
    window.location.href = `https://be-shortenurl.onrender.com/${code}`;
  }, [code]);

  return <p>Redirecting...</p>;
}
