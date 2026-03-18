import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-xl">Hook</span>
        </div>
        <p className="text-gray-600 text-sm">
          © 2026 Hook. 모든 권리 보유.
        </p>
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          <a href="#" className="hover:text-white transition-colors">이용약관</a>
          <a href="#" className="hover:text-white transition-colors">문의하기</a>
        </div>
      </div>
    </footer>
  );
}
