import { useState } from "react";
import type { ChangeEvent } from "react";

function Step07() {
  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <input type="email" value={email} onChange={handleChange} />
      <p>입력된 이메일 : {email}</p>
    </div>
  )
}

export default Step07;