import { getCompanies } from "../../../services/companyService";

export default function Companies() {
  
    const companies = getCompanies();
    console.log(companies);

  return (       
    <div>
      <div>
        <mark>Companies</mark> are currently{" "}
        <span className="bold-element">{companies.length}</span>
      </div>
    </div>
  );
}
