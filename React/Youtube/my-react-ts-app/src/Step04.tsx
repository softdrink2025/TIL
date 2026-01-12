import { useState } from "react";

function Step04() {
  const [name, setName] = useState<string>("");

  return (
    <div>
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>입력된 이름 : {name}</p>
    </div>
  )
}

export default Step04;