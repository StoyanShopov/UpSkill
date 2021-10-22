import { useState, useEffect } from "react";
import { retriveCompanies } from "../../../services/companyService";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  
  useEffect(() => {
    retriveCompanies().then((companies) => {
      setCompanies(companies);
    });
  }, []);

  return (
    <div>
      <div>
        <mark>Companies</mark> are currently{" "}
        <span className="bold-element">{companies.length}</span>
      </div>
    </div>
  );
}
