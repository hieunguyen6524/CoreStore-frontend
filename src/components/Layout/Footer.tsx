import { Facebook, Youtube } from "lucide-react";

interface FooterProps {
  title: string;
  contents: string[];
}

const footerData: FooterProps[] = [
  {
    title: "VỀ CORESTORE",
    contents: ["Giới thiệu", "Tuyển dụng", "Liên hệ"],
  },
  {
    title: "CHÍNH SÁCH",
    contents: [
      "Chính sách bảo hành",
      "Chính sách giao hàng",
      "Chính sách bảo mật",
    ],
  },
  {
    title: "THÔNG TIN",
    contents: [
      "Hệ thống cửa hàng",
      "Hướng dẫn mua hàng",
      "Hướng dẫn thanh toán",
      "Hướng dẫn trả góp",
      "Tra cứu địa chỉ bảo hành",
      "Build PC",
    ],
  },
  {
    title: "TỔNG ĐÀI HỖ TRỢ (8:00 - 21:00)",
    contents: [
      "Mua hàng: 0123456789",
      "Bảo hành: 0123456789",
      "Khiếu nại: 0123456789",
      "Email: cskh@corestore.com",
    ],
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        {/* Các cột thông tin */}
        {footerData.map((col, index) => (
          <div className="footer__col" key={index}>
            <span className="footer__title">{col.title}</span>
            <div className="footer__content">
              {col.contents.map((item, idx) => (
                <span className="footer__item" key={idx}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Mạng xã hội */}
        <div className="footer__col">
          <span className="footer__title">KẾT NỐI VỚI CHÚNG TÔI</span>
          <div className="footer__socials">
            <img src="/icons/facebook.png" alt="" />
            <img src="/icons/youtube.png" alt="" />
            <img src="/icons/tiktok.png" alt="" />
          </div>
        </div>

        {/* Đơn vị vận chuyển + Thanh toán */}
        <div className="footer__col">
          <span className="footer__title">ĐƠN VỊ VẬN CHUYỂN</span>
          <div className="footer__logos">
            <img src="/footers/ship_1.webp" alt="GHN" />
            <img src="/footers/ship_2.webp" alt="EMS" />
          </div>
          <span className="footer__title">CÁCH THỨC THANH TOÁN</span>
          <div className="footer__logos">
            <img src="/footers/pay_4.webp" alt="ZALO PAY" />
            <img src="/footers/pay_7.webp" alt="VISA" />
            <img src="/footers/pay_5.webp" alt="TIEN MAT" />
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="footer__bottom">
        <span>© 2025 CoreStore. All rights reserved.</span>
        <img src="/footers/logo-bct.png" alt="Bộ Công Thương" />
      </div>
    </footer>
  );
}

export default Footer;
