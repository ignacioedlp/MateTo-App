import React from "react";
import { SvgXml } from "react-native-svg";

export default function OurClubLogo() {
  const logo = `<svg width="94" height="104" viewBox="0 0 94 104" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M77.5109 4.32067C77.1486 4.30515 76.7868 4.36397 76.4438 4.49418L68.8017 7.24906L68.7443 7.27445C64.5735 9.00268 61.0914 12.3144 58.9297 16.6182H58.9259L58.9106 16.6605L58.8265 16.8382L55.2426 27.4473C52.9768 27.8751 50.226 28.1667 47 28.1667C38.5008 28.1667 33.2518 26.1517 31.6852 24.9167C33.2518 23.6817 38.5008 21.6667 47 21.6667C48.3708 21.6667 49.6642 21.7107 50.8784 21.819L53.0318 15.5137C50.8776 15.2754 48.8016 15.1667 47 15.1667C40.338 15.1667 29.8795 16.6009 26.5407 21.5059C26.3711 21.6654 26.2184 21.8457 26.0856 22.0433C26.0856 22.0433 24.5514 24.1965 23.0027 26.7998C22.2284 28.1015 21.443 29.52 20.8073 30.9343C20.1715 32.3485 19.5833 33.6207 19.5833 35.5215C19.5833 35.8865 19.6101 36.2449 19.656 36.5964C17.2588 39.6499 9.79163 50.402 9.79163 66.2315C9.79163 76.9984 14.9206 85.2039 22.0427 90.2383C29.1648 95.2727 38.2163 97.5 47 97.5C55.7837 97.5 64.8351 95.2727 71.9572 90.2383C79.0793 85.2039 84.2083 76.9984 84.2083 66.2315C84.2083 50.402 76.7411 39.6499 74.3439 36.5964C74.3898 36.2449 74.4166 35.8865 74.4166 35.5215C74.4166 33.6207 73.8284 32.3485 73.1927 30.9343C72.5569 29.52 71.7715 28.1015 70.9972 26.7998C69.4485 24.1965 67.9143 22.0433 67.9143 22.0433C67.7765 21.8462 67.6187 21.6673 67.4439 21.5101C66.7607 20.5084 65.7969 19.6473 64.6097 18.9203C66.0992 16.4056 68.2289 14.4332 70.7906 13.3682L78.2644 10.6726C78.926 10.4453 79.4937 9.96676 79.8673 9.32137C80.2409 8.67599 80.3963 7.90531 80.3062 7.14543C80.2161 6.38555 79.8861 5.68535 79.3747 5.16848C78.8632 4.65162 78.2031 4.35134 77.5109 4.32067ZM28.1319 30.0287C32.4753 33.5697 41.1828 34.6667 47 34.6667C50.1738 34.6667 54.1974 34.321 57.92 33.4522C58.0495 33.4264 58.1772 33.3911 58.3024 33.3464C61.2529 32.6225 63.9776 31.5698 65.868 30.0287C65.9472 30.1594 66.0068 30.2424 66.0861 30.3757C66.7805 31.5429 67.4638 32.7926 67.9296 33.8288C68.3955 34.865 68.5416 35.8255 68.5416 35.5215C68.5416 35.8862 68.3849 36.4832 67.5242 37.3962C66.6635 38.3091 65.1634 39.3609 63.1868 40.2653C59.2337 42.0742 53.4227 43.3334 47 43.3334C40.5772 43.3334 34.7662 42.0742 30.8131 40.2653C28.8365 39.3609 27.3364 38.3091 26.4757 37.3962C25.615 36.4832 25.4583 35.8862 25.4583 35.5215C25.4583 35.8255 25.6045 34.865 26.0703 33.8288C26.5361 32.7926 27.2195 31.5429 27.9139 30.3757C27.9931 30.2424 28.0528 30.1594 28.1319 30.0287ZM22.8689 42.5166C24.4181 44.0219 26.3306 45.2465 28.5679 46.2702C33.4743 48.5152 39.9024 49.8334 47 49.8334C54.0975 49.8334 60.5256 48.5152 65.432 46.2702C67.6693 45.2465 69.5818 44.0219 71.1311 42.5166C73.7219 46.288 78.3333 54.5955 78.3333 66.2315C78.3333 74.815 74.6498 80.6216 68.7979 84.7582C62.946 88.8947 54.8621 91 47 91C39.1378 91 31.0539 88.8947 25.202 84.7582C19.3502 80.6216 15.6666 74.815 15.6666 66.2315C15.6666 54.5955 20.2781 46.288 22.8689 42.5166Z" fill="black"/>
</svg>
`
  const SvgImage = () => <SvgXml xml={logo} width="301px" />;

  return <SvgImage />;
};