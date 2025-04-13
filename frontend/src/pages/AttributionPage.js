import React from "react";

const AttributionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-white py-20 shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl font-extrabold tracking-tight animate-pulse">
            Nguồn và Trích dẫn
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Danh sách các nguồn và tài liệu tham khảo được sử dụng trong dự án
            này, đảm bảo tính chính xác và đáng tin cậy.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900 opacity-20 pointer-events-none"></div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Data Sources Section */}
        <section className="bg-white shadow-2xl rounded-lg p-10 mb-16">
          <h2 className="text-4xl font-bold mb-8 text-blue-600 text-center">
            Nguồn Dữ Liệu
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Tổ chức Y tế Thế giới (WHO)",
                description: "Cung cấp thông tin y tế toàn cầu đáng tin cậy.",
                link: "https://www.who.int/",
              },
              {
                title: "PubMed - Thư viện Y khoa Quốc gia Hoa Kỳ",
                description: "Nền tảng nghiên cứu y khoa hàng đầu thế giới.",
                link: "https://pubmed.ncbi.nlm.nih.gov/",
              },
              {
                title: "Cục Quản lý Thực phẩm và Dược phẩm Hoa Kỳ (FDA)",
                description: "Thông tin về an toàn thực phẩm và dược phẩm.",
                link: "https://www.fda.gov/",
              },
            ].map((source, index) => (
              <li
                key={index}
                className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <a
                  href={source.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 hover:underline transition duration-200"
                >
                  <h3 className="text-2xl font-semibold mb-4">{source.title}</h3>
                  <p className="text-base text-gray-600">{source.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Citations Section */}
        <section className="bg-white shadow-2xl rounded-lg p-10">
          <h2 className="text-4xl font-bold mb-8 text-blue-600 text-center">
            Trích Dẫn
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 text-center">
            Tất cả các thông tin và dữ liệu được sử dụng trong dự án này đều
            được trích dẫn từ các nguồn đáng tin cậy. Vui lòng tham khảo các
            liên kết trên để biết thêm chi tiết. Chúng tôi cam kết đảm bảo tính
            minh bạch và chính xác trong việc sử dụng dữ liệu.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; 2025 Drug Interaction Web. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition duration-200"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition duration-200"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition duration-200"
            >
              LinkedIn
            </a>
          </div>
          <p className="mt-4">
            <a
              href="/"
              className="text-blue-400 hover:text-blue-600 hover:underline transition duration-200"
            >
              Trang chủ
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AttributionPage;