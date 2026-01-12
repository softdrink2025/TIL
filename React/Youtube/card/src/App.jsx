// src/App.jsx

import React from 'react';
import Card from './Card'; // Card 컴포넌트를 가져옵니다.

function App() {
  const handleButtonClick = (title) => {
    alert(`${title} 카드의 버튼이 클릭되었습니다!`);
  };

  const cardsData = [
    { id: 1, title: "첫 번째 제품", description: "Vite 환경에서 작동하는 첫 번째 카드입니다.", imageUrl: 'img/1.avif', buttonText: "정보 보기" },
    { id: 2, title: "두 번째 서비스", description: "JavaScript와 CSS로 완성된 깔끔한 카드 UI.", imageUrl: 'img/2.avif', buttonText: "신청하기" },
    { id: 3, title: "세 번째 아이템", description: "TypeScript와 Tailwind 없이 만들어진 표준 React 예제입니다.", imageUrl: 'img/3.avif', buttonText: "구매하기" }
  ];

  return (
    <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        padding: '20px' 
    }}>
      {cardsData.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
          buttonText={card.buttonText}
          onButtonClick={() => handleButtonClick(card.title)}
        />
      ))}
    </div>
  );
}

export default App;