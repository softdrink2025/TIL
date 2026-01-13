import React from 'react';

const App: React.FC = () => {
  return (
    // 전체 화면 중앙 정렬 및 배경색 설정
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* 카드 형태의 컨테이너 */}
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        
        {/* 제목: 크기, 굵기, 색상, 마진 적용 */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          TailwindCSS 적용 완료 🎉
        </h1>

        {/* 본문: 색상, 마진 적용 */}
        <p className="text-gray-700 mb-6">
          React + Vite + TypeScript + TailwindCSS 조합이 정상적으로 동작합니다.
        </p>

        {/* 버튼: 패딩, 배경색, 글자색, 둥근 모서리, 호버 효과 추가 */}
        <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
          클릭해보세요
        </button>
        
      </div>
    </div>
  );
};

export default App;